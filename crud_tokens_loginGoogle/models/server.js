
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){

        //Crea la aplicacion de express
        this.app = express();

        //Llama la variable port del .env para hacerla visible para todos
        this.port = process.env.PORT;

        //Ruta en un string para que sea mas facil de leer *opcional*
        this.usuariosPath = '/api/user';
        this.authPath =     '/api/auth';

        //Conexion a la base de datos
        this.conectarDB();

        //Ejecuta el metodo de middlewares
        //Middlewares
        //Son funciones que van agregando funcionalidades al webserver
        this.middlewares();

        //Ejecuta las rutas
        this.routes();

    };


    async conectarDB(){
        await dbConnection();
    };


    middlewares(){

        //Cors
        this.app.use( cors() );

        //Lectura y parse del body
        this.app.use( express.json() );

        //Directorio publcio
        this.app.use( express.static('public') );

    };


    routes(){

        //P1: Se declara la ruta a la que se le va a hacer
        //P2 se coloca la ruta de donde vienen las rutas
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/users'));
        
    };


    listen(){

        this.app.listen( this.port, () => console.log( 'Server running on port', this.port ) );
        
    };

};


module.exports = Server;