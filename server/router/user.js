var express = require('express');
var projectService = require('../service/projectService')
var router = express.Router();

router.post('/project/add',async (req,res)=>{
    console.log(req.body)
    await projectService.addProject(req.body);
    res.send({ok:true})
})

module.exports = router