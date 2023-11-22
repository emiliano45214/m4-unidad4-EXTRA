var pool = require('./bd');


async function traerCatalogoVinos(){
   
        var query = 'SELECT * FROM catalogo_vinos';
        var rows = await pool.query(query);
        return rows;
    
}

async function insertarNuevoProducto(obj){
    try{
        var query = "insert into catalogo_vinos set ?";
        var rows = await pool.query(query,[obj])
        return rows;

    }catch(error){
        console.log(error);
        throw error;
    }
}

async function borrarProductoPorId(id){
    var query = 'delete from catalogo_vinos where id = ?';
    var rows = await pool.query(query,[id]);
    return rows;
}

async function TraerProductoPorId(id){
    var query = 'select * from catalogo_vinos where id = ?'
    var rows = await pool.query(query,[id]);
    return rows[0];
}


async function modificarDatosDeProducto(obj,id){
    try{
        var query = 'update catalogo_vinos set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }catch(error){
        
        throw error
    }
}






module.exports = { traerCatalogoVinos, insertarNuevoProducto, borrarProductoPorId, TraerProductoPorId, modificarDatosDeProducto}