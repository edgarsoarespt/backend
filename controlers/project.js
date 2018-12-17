'use strict'

var controlers = {
    home: function(req,res){
        return res.status(200).send({message:'soy la home'});
    },
    test: function(req,res){
        return res.status(200).send({message:'soy el test'});
    },
    corina: (req,res) => res.status(200).send({message:'soy corina'}),
    fabian: (req,res) => res.status(200).send({message:'soy fabian'}),
    julian: (req,res) => res.status(200).send({message:'soy julian'}),
}

module.exports = controlers;