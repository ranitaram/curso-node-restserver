const {Router} = require('express');
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/users.controllers');

const router = Router();

router.get('/',  usuariosGet);

router.post('/',  usuarioPost);

router.put('/:id',  usuarioPut);

router.delete('/', usuarioDelete );

router.patch('/',usuarioPatch );




module.exports = router;