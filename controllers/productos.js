const {response, request} = require('express');
const { body } = require('express-validator');
const {Producto, Usuario, Categoria} = require('../models')

//Crear Producto
const crearProducto = async (req = request, res = response)=>{
   const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre}, ya existe`
        });
    }
    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id

        //Usuario,
        //Categoria
        
    }
    //preparar categoria a guardar
    const producto = new Producto(data);
    
    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

//obtenerProductos - paginado -populate
const obtenerProductosGet = async (req = request, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    });

}

//obtenerCategoria populate {} aqui solo me va a regresar un objeto de la categoria 
const obtenerProducto = async (req, res = response)=>{
    const {id: _id} = req.params;
    const producto =  await Producto.findById(_id).populate('usuario', 'nombre');

    res.status(200).json({
        msg:"producto encontrado",
        producto
    });
}

module.exports = {
    crearProducto,
    obtenerProductosGet,
    obtenerProducto
}