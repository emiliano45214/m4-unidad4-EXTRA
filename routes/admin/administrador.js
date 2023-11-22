var express = require('express');
var router = express.Router();
var catalogoVinosModel = require('../../models/catalogoVinosModel');


/* GET home page. */
router.get('/', async function(req, res, next) {

  var catalogoVinos = await catalogoVinosModel.traerCatalogoVinos();


  res.render('admin/administrador', { 
    layout: 'admin/layout',
    persona: req.session.usuario,
    catalogoVinos
    });

});


router.post('/', async(req, res, next)=>{
  try{
    if(req.body.nombre != "" &&  req.body.marca != "" && req.body.precio != "" && req.body.clasificacion != ""  ){
      await catalogoVinosModel.insertarNuevoProducto(req.body);
      res.redirect('/admin/administrador');
    }else{
      res.render("admin/paginaError", {
        layout: 'admin/layout',
        error: true,
        message: "¡Campos incompletos. Al cargar un nuevo producto es necesario que todos los campos esten completos!"
      })
    }
  }catch(error){
    console.log(error)
    res.render("admin/paginaError", {
      layout: 'admin/layout',
      error: true,
      message: "¡Tuvimos un problema, vuelve a intentarlo mas tarde!"})
  }
});




router.get('/eliminar/:id', async (req, res, next)=>{
  var id = req.params.id;

  await catalogoVinosModel.borrarProductoPorId(id);
  res.redirect('/admin/administrador')
});


router.get('/modificar/:id', async (req, res, next)=>{
  var id = req.params.id;
  var producto = await catalogoVinosModel.TraerProductoPorId(id);

  res.render('admin/modificar', {
    layout:'admin/layout',
    producto
  })
});


router.post('/modificar', async (req, res , next)=>{
  try{
    var obj = {
      nombre: req.body.nombre,
      marca: req.body.marca,
      clasificacion: req.body.clasificacion,
      precio: req.body.precio,
    }
    console.log(obj);

    await catalogoVinosModel.modificarDatosDeProducto(obj, req.body.id);
    res.redirect('/admin/administrador');
  }catch (error){
    console.log(error)
    res.render('admin/modificar',{
      layout:'admin/layout',
      error: true,
      message:'No se modifico la novedad'
    })
  }
})








module.exports = router;