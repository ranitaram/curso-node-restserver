
//Controlador 
const {response} = require('express');
const Usuario = require('../models/usuario');

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarjwt');

const login = async (req, res = response) => {

   const {correo, password} = req.body;
   try {
       //Verificar si el Email existe
       const usuario = await Usuario.findOne({correo});
       if (!usuario) {
           return res.status(400).json({
               msg: 'Usuario / Password no son correcrtos - correo'
           });
       }

       //si el usuario esta activo
       if (!usuario.estado) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correcrtos - estado: false'
        });
    }

       //Verificar la contraseña
       const valiPassword = bcryptjs.compareSync(password, usuario.password); //funcion para ver si hace match con la contraseña que ingresa el cliente
       if (!valiPassword) {
        return res.status(400).json({
            msg: 'Usuario / Password no es correcrto - password'
        }); 
       }

       //Generar el JWT
       const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
        
    })
   } catch (error) {
       return res.status(500).json({
           msg: 'Hable con el administrador'
       })
   }

    
}

module.exports = {
    login
}