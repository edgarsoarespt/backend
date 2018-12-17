'use strict'

var Project = require('../models/project');

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

    saveProject: function(req,res){
        var project = new Project();

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;

        project.save((err,projectStored)=>{
            if (err) return res.status(500).send({message:'Error al guardar 500'});
            if (!projectStored) return res.status(404).send({message: 'Error al guardar 404'});
            return res.status(200).send({project: projectStored});
        });
    },
    getProject: function(req,res){
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message:"Error 404. Falta id"});

        Project.findById(projectId,(err,project) => {
            if (err) return res.status(500).send({message:"Error 500"});
            if (!project) return res.status(404).send({message:"Error 404"});
            return res.status(200).send({project: project});
        });
    },

    getProjects: function(req,res){
        /* find({year:2019}) */
        /* Project.find({}).sort('-year').exec((err,projects)=>{ */
        Project.find({}).exec((err,projects)=>{
            if (err) return res.status(500).send({message:"Error 500"});
            if (!projects) return res.status(404).send({message:"Error 404"});
            return res.status(200).send({projects: projects});
        });
    }
}

module.exports = controlers;