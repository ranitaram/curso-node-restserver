const {response} = require('express');
const path = require('path'); //para crear los paths

const cargarArchivo = (req, res = response) => {


  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No hay archivos que subir.'});
    return;
  }

  const {archivo} = req.files;
  const nombreCortado = archivo.name.split('.'); // el split es la funcion que va a separar el nombre y la extensíon
  const extension = nombreCortado[nombreCortado.length - 1]; // me manda solo el tipo de extension

  //validar la extension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionesValidas.includes(extension)) {
      return res.status(400).json({
          msg: `La extension ${extension} no es permitida, solo de tipo:  ${extensionesValidas}`
      });
  }

  res.json({extension});


//   const uploadPath =path.join(  __dirname, '../uploads/', archivo.name);

//   archivo.mv(uploadPath, (err)=> {
//     if (err) {
//       return res.status(500).json({err});
//     }

//     res.json({msg: 'File uploaded to ' + uploadPath});
//   });
}

module.exports = {
    cargarArchivo
}