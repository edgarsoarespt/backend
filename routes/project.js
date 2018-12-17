'use strict'

var express = require('express');
var ProjectControler = require('../controlers/project');

var router = express.Router();

router.get('/home',ProjectControler.home);
router.get('/test',ProjectControler.test);
router.get('/edgar',function(req,res){
    return res.status(200).send({message:'soy edgar'});
});
router.get('/corina',ProjectControler.corina);
router.post('/saveproject',ProjectControler.saveProject);
router.get('/project/:id?',ProjectControler.getProject);
router.get('/getprojects',ProjectControler.getProjects);

module.exports = router;