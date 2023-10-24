var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/administrador', { 
    layout: 'admin/layout',
    persona: req.session.usuario
    });

});

module.exports = router;