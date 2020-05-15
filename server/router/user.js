var express = require('express');
var fs = require('fs')


const projectService = require('../service/projectService')
const changeRequestService = require('../service/changeRequestService')
const processDocumentsService = require('../service/processDocumentsService')
const scientificSearchService = require('../service/scientificSearchService')
const noticeDaoService = require('../service/noticeService')


var multer = require('multer');
var router = express.Router();

var upload = multer({
    dest: './file/'
})
/**
 * 我的科研
 */ 
router.get('/project/myProject',async (req,res) => {
    var result = await projectService.myProjects(req.query.teacherID)
    console.log(result)
    res.send(result)
})

/**
 * 申报项目
 * teacherID
 * teacherName
 * section
 * projectMembers
 * projectName
 * type
 * projectContent
 * funds
 * startTime
 * endTime
 * fileName
 * filePath
 * state
 * ?issue
 */
router.post('/project/add',upload.single('file'),async (req,res)=>{
    var obj = {};
    Object.assign(obj,req.body,{fileName:req.file.originalname,filePath:req.file.path})
    await projectService.addProject(obj);
    res.send({ok:true})
})

/**
 * 变更项目申请
 * projectID
 * projectName
 * teacherID
 * teacherName
 * changeContent
 * state
 * ?issue
 */
router.post('/project/change',async (req,res) => {
    console.log(req.body);
    await changeRequestService.changeProject(req.body)
    res.send({ok:true})
})

/**
 * 提交报告
 * projectID
 * type
 * state
 * fileName
 * filePath
 */
router.post('/project/submitReport',upload.single('file'),async (req,res)=>{
    console.log(req.file.originalname)
    console.log(req.file.path)
    console.log(req.body)
    var obj = {};
    Object.assign(obj,req.body,{fileName:req.file.originalname,filePath:req.file.path})
    await processDocumentsService.submitReport(obj)
    res.send({ok:true})
})

/**
 * 申请科研成果
 * teacherID
 * teacherName
 * projectMembers
 * title
 * type
 * state
 * fileName
 * filePath
 */
router.post('/scientificSearch/add',upload.single('file'),async (req,res)=>{
    console.log(req.file.originalname)
    console.log(req.file.path)
    console.log(req.body)
    var obj = {};
    Object.assign(obj,req.body,{fileName:req.file.originalname,filePath:req.file.path})
    await scientificSearchService.applyResults(obj)
    res.send({ok:true})
})

/**
 * 我的科研成果
 * teacherID
 */
router.get('/scientificSearch/myResults',async (req,res) => {
    var result = await scientificSearchService.myResults(req.query.teacherID);
    res.send(result)
})

/**
 * 通知查看
 * teacherID
 */

router.get('/notice/look',async (req,res) => {
    var result = await noticeDaoService.lookNotice(req.query.teacherID);
    res.send(result)
})

/**
 * 下载文件
 */

 router.get('/download',async (req,res) => {
     console.log(req.query.path)
     var data = fs.readFileSync(req.query.path);
     res.send(data)
 })


module.exports = router