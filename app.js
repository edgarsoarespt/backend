'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas
var project_routes = require('./routes/project');
// middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//rutas
app.use('/api',project_routes);

var ProjectControler = require('./controlers/project');
app.get('/api/fabian',ProjectControler.fabian);
app.get('/api/julian',ProjectControler.julian);
/* app.get('/',(req,res) => {
    res.status(200).send(
        "<h1>pagina de inicio</h1>"
    );
});*/

app.get('/api/php',(req,res) => {
    res.status(200).send(
       {
           message : "hola mundo desde php"
       }
    );
});
/*
app.post('/test/:id',(req,res) => {
    console.log(req.param('nombre')); //parametros dentro del body - descontinuado
    console.log(req.body.nombre); //parametros dentro del body
    console.log(req.query.web); //parametros en url tipo get
    console.log(req.params.id); //parametros en url tipo get
    

    res.status(200).send({
        message: "hola mundo desde nodejs"
    });
}); */

// exportar
module.exports = app;
