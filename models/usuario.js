

const {Schema, model} = require('mongoose');

//El objeto
const UsuarioSchema = Schema({
 nombre: {
     type: String,
     required: [true, 'El nombre es obligatorio']//recibe un arreglo
 },
 correo: {
    type: String,
    required: [true, 'El correo es obligatorio'], //recibe un arreglo
    unique: true //para que no exista correos duplicados
},
 password: {
    type: String,
    required: [true, 'la contraseña es obligatorio']//recibe un arreglo
},
 img: {
    type: String,
},
 rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
},
 estado: {
    type: Boolean,
    default: true // 
},
 google: {
    type: Boolean,
    default: false
},
});
//para sobreescribir
UsuarioSchema.methods.toJSON = function(){
  const {__v, password, ...usuario} = this.toObject(); //estoy sacando v y password, todo lo demas se almacena en suario
  return usuario;
}

module.exports = model('Usuario', UsuarioSchema);