var express = require('express');
var fs = require('fs')
const crypto = require('crypto');

const processService = require('../service/processService')
const teacherService = require('../service/teacherService')
const projectService = require('../service/projectService')
const changeRequestService = require('../service/changeRequestService')
const processDocumentsService = require('../service/processDocumentsService')
const scientificSearchService = require('../service/scientificSearchService')
const noticeDaoService = require('../service/noticeService')
const managerService = require('../service/managerService')
const sectionService = require('../service/sectionService')


function hmac(data){
    let hmac = crypto.createHmac('md5','后台传入/任意值');
    return hmac.update(data).digest('base64');
  }

var router = express.Router();

// ----------超级管理
/**
 * 查看需 设置审批流程项目
 */
router.get('/project/noSet',async (req,res) => {
    var data = await projectService.notSet()
    res.send(data)
})


/**
 * 设置审批
 */
router.post('/setProcess',async (req,res) => {
    let checkObj = {
        pid: req.body.id,
        setLevel: req.body.check
    }

    let endObj = {
        pid: req.body.id,
        setLevel: req.body.end
    }
    await processService.setProcess(checkObj,endObj)
    res.send({ok:true})
})
// ------------

/**
 * 查看申报审核或者结题的项目
 */
router.get('/project/check',async (req,res) => {
    let result = await managerService.searchRank(req.query.mid)
    console.log(result)
    let obj = {
        type: req.query.type,
        section: result[0].section,
        currentLevel: result[0].rank - 1,
        rank: result[0].rank
    }
    console.log(obj)
    var data = await projectService.checkProject(obj);
    res.send(data)
})


/**
 * 通过审核或结题
 */
router.post('/yesProject',async (req,res) => {
    console.log(req.body)
    await processService.yesProcess(req.body.pid,req.body.type)
    res.send({ok:true})
})

/**
 * 拒绝审核或结题
 */
router.post('/noProject',async (req,res) => {
    console.log(req.body)
    await processService.noProcess(req.body.pid,req.body.type)
    res.send({ok:true})
})


/**
 * 下载文件
 */

router.get('/download',async (req,res) => {
    var data = fs.readFileSync(req.query.path);
    res.send(data)
})





/**
 * 项目立项的项目
 */
router.get('/project/establishProject',async (req,res) => {
    var data = await projectService.establishProject(req.query.section)
    res.send(data)
})


/**
 * 确定  立项
 */
router.post('/project/yesEstablish',async (req,res) => {
    var data = await projectService.yesEstablish(req.body.id)

    res.send(data)
})



/**
 * 进展管理的项目
 */
router.get('/project/processProject',async (req,res) => {
    var data = await projectService.processProject(req.query.section)
    res.send(data)
})

/**
 * 中检 通知
 */
router.post('/project/midCheck',async (req,res) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var time = year + '-' + month + '-' + day; 
    var obj = {
        title: '中检通知',
        content: `请提交项目编号${req.body.projectID}的中检报告`,
        recipient: req.body.teacherName,
        time: time,
        teacherID: req.body.teacherID,
    }
    console.log(obj)
    var data = await noticeDaoService.publish(obj)
    res.send(data)
})

/**
 * 中检修改
 */
router.post('/project/update',async (req,res) => {
    console.log(req.body)
    var data = await projectService.updateInfo(req.body)
    res.send(data)
})

/**
 * 科研汇总
 */
router.get('/project/allProject',async (req,res) => {
    var data = await projectService.allProject()
    res.send(data)
})


/**
 * 查看需审核的科研成果
 */
router.get('/lookCheckResult',async (req,res) => {
    var data = await scientificSearchService.lookCheckResult()
    res.send(data)
})

/**
 * 同意科研成果
 */
router.post('/result/agree',async (req,res) => {
    var data = await scientificSearchService.agreeResult(req.body.id)
    res.send(data)
})

/**
 * 拒绝科研成果
 */
router.post('/result/reject',async (req,res) => {
    var data = await scientificSearchService.rejectResult(req.body.id)
    res.send(data)
})


/**
 * 通知发布
 */
router.post('/notice/publish',async (req,res) => {
    await noticeDaoService.publish(req.body)
    res.send({ok:true})
})


/**
 * 查看变更申请管理
 */
router.get('/lookApply',async (req,res) => {
    var result = await changeRequestService.lookApply()
    res.send(result)
})

/**
 * 查看提交报告管理
 */
router.get('/lookReport',async (req,res) => {
    var result = await processDocumentsService.lookReport();
    res.send(result)
})

/**
 * 查看提交报告管理
 */
router.post('/checkReport',async (req,res) => {
    var result = await processDocumentsService.checkReport(req.body.id,req.body.state,req.body.projectID)
    res.send(result)
})


/**
 * 院级 项目统计
 */
router.get('/projectBySection',async (req,res) => {
    console.log(req.query)
    var result = await projectService.projectBySection(req.query.year)
    res.send(result)
})

/**
 * 院级 经费统计
 */
router.get('/fundsBySection',async (req,res) => {
    var result = await projectService.fundsBySection();
    res.send(result)
})
 

/**
 * 注册 
 */
router.post('/registerT',async (req,res) => {
    console.log(req.body.password)
    let mima = hmac(req.body.password);
    var obj = {
        teacherID: req.body.teacherID,
        teacherName: req.body.teacherName,
        password: mima,
        section: req.body.section,
        phone: req.body.phone
    }
    await teacherService.register(obj)
    res.send({ok:true}) 
})

router.post('/registerM',async (req,res) => {
    let mima = hmac(req.body.password);
    var obj = {
        mid: req.body.mid,
        name: req.body.name,
        password: mima,
        position: req.body.position,
        section: req.body.section
    }
    console.log(req.body)
    await managerService.register(obj)
})


/**
 * 审核  变更申请
 */
router.post('/change/check',async (req,res) => {
    console.log(req.body)
    await changeRequestService.check(req.body.pid,req.body.state)
    res.send( {ok:true} )
})







module.exports = router