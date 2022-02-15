//desestructurar
const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'no name', apikey, page = 1, limit} =req.query;
    
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
  }

const usuarioPost = (req, res = response) => { //req (lo que la persona solicita)
 
    const {nombre, edad} = req.body;
    res.json({
        msg: 'put API - contollerpost',
        nombre,
        edad
    })
  }  

const usuarioPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'post API - controller',
        id
    })
  }  

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete API- controller'
    })
  }  

const usuarioPatch =  (req, res = response) => {
    res.json({
        msg: 'patch API- controller'
    })
  }   

  module.exports = {
      usuariosGet,
      usuarioPost,
      usuarioPut,
      usuarioDelete,
      usuarioPatch
  }