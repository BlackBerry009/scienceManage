var express = require('express');

var teacherService = require('../service/teacherService');
var managerService = require('../service/managerService');

var sectionService = require('../service/sectionService')

var router = express.Router();

/**
 * 登陆
 */
router.post('/login', async (req, res) => {
    var data = req.body;
    if (data.type == 'teacher') {
        const info = await teacherService.login(req.body.teacherID)
        if (info.length == 0) {
            res.send({ forbid: true })
        } else {
            res.send({
                type: 'teacher',
                data: info
            })
        }
    } else if (data.type == 'manager') {
        const info = await managerService.login(req.body.teacherID)
        if (info.length == 0) {
            res.send({ forbid: true })
        } else {
            res.send({
                type: 'manager',
                data: info
            })
        }
    }
})

/**
 * 得到所有的院系
 */
router.get('/allSection', async (req, res) => {
    const result = await sectionService.allSection()
    res.send({ data: result })
})

module.exports = router;