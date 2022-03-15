const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductosGet, obtenerProducto } = require('../controllers/productos');

const { existeCategoria, existeProducto } = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos los productos
router.get('/', obtenerProductosGet);

//obtener un producto por id - publico

//TODO: Hacer un middleware personalizador que va a validar el Id en la ruta
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
   validarCampos
], obtenerProducto);

//crear producto
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos 
],
crearProducto
);



module.exports = router;