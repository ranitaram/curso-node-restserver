const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
//las propiedades se declaran en el constructor
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();


        //Middlewares es una funcion que se ejecuta antes  que un controlador o seguir con las peticiones
        this.middlewares();


        //Rutas de mi aplicacion
        this.routes(); // llamar a las rutas
    }

    async conectarDB(){
        await dbConnection();
    }
    
    middlewares(){
        //middlewares
        //cors
        this.app.use(cors());
       
        //Lectura y parseo del body
        this.app.use(express.json());
        /*cualquier informacion que venga de un post, put o delete
        la va a serializar y convertir en un json
        */


        //Directorio publico
        this.app.use(express.static('public'));
    }





    //metodo
    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' , this.port);
        });
    }
}

module.exports = Server;