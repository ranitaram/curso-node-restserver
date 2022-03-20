const path = require('path');
const fs = require('fs');
const {response} = require('express');
const { subirArchivo } = require('../helpers');

const {Usuario, Producto} = require('../models');



const cargarArchivo = async (req, res = response) => {


//   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
//     res.status(400).json({msg: 'No hay archivos que subir.'});
//     return;
//   }
  
  try {
      //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
      const nombre = await subirArchivo(req.files, undefined, 'imgs');
    
      res.json({
          nombre
      });
      
  } catch (msg) {
      res.status(400).json({msg});
  }

  
}

const actualizarImagen = async (req, res = response) =>{

    //para saber si hay archivos que subir
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({msg: 'No hay archivos que subir.'});
    //     return;
    //   }

    const {id, coleccion} = req.params;

let modelo;

 switch (coleccion) {
     case 'usuarios':
         modelo = await Usuario.findById(id);
         if (!modelo) {
             return res.status(400).json({
                 msg: `No existe usuario con el id ${id}`
             });
         }
         break;
         case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;   
 
     default:
         return res.status(500).json({msg: 'Se me olvidó validar esto'});
 }


    //limpiar imagenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor, hay que construir el path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        //ara borrar el archivo
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
         
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();


    res.json({modelo})
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}