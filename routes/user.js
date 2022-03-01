const {Router} = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');

const {validarCampos} = require('../middlewares/validar-campos');
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/users.controllers');
const { esRoleValido, existeUsuarioPorId, emailExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/',  usuariosGet);

router.post('/',
[    
    //los check son middleware
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //verificacion personalizada mandando el custom
    check('rol').custom( esRoleValido),

    validarCampos

],  usuarioPost); // en la segunda posicion van los los middlewares, si son mas de 2 se meten en un arreglo en la misma segunda posicion

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido),
    validarCampos
] ,usuarioPut);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuarioDelete );

router.patch('/',usuarioPatch );




module.exports = router;