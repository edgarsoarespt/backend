'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(()=>{
        console.log('Conexion a mongodb establecida con exito!!!');

        //Creacion del servidor
        app.listen(port, ()=>{
            console.log("Servidor Node corriendo correctamente en la url");
        });

    })
    .catch(error => console.log(err));