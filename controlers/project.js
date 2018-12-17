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
        project.image = null;

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
    },

    updateProject: function(req,res){
        var projectId = req.params.id;
        var update = req.body;

        /* Project.findByIdAndUpdate(projectId,update,(err,projectUpdated)=>{ */
        Project.findByIdAndUpdate(projectId,update,{new:true},(err,projectUpdated)=>{
            if (err) return res.status(500).send({message:"Error 500"});
            if (!projectUpdated) return res.status(404).send({message: "Error 404"});
            return res.status(200).send({projectUpdated:projectUpdated});
        });
    },

    deleteProject: function(req,res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId,(err,projectDeleted)=>{
            if (err) return res.status(500).send({message:"Error 500"});
            if (!projectDeleted) return res.status(404).send({message: "Error 404"});
            return res.status(200).send({projectDeleted:projectDeleted});
        })
    },

    uploadImage: function(req,res){
        var projectId = req.params.id;

        if (req.files){
            var filePath = req.files.file.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,imageUpload)=>{
                if (err) return res.status(500).send({message:"Error 500"});
                if (!imageUpload) return res.status(404).send({message: "Error 404"});
                return res.status(200).send({image:fileName});
            });
        }
        else {
            return res.status(200).send({message:"imagen no subida"});
        }
    }
}

module.exports = controlers;