var express = require('express');

var teacherService = require('../service/teacherService');
var managerService = require('../service/managerService');
var projectService = require('../service/projectService');

var sectionService = require('../service/sectionService')

var router = express.Router();

/**
 * 登陆
 */
router.post('/login', async (req, res) => {
    var data = req.body;
    if (data.type == 'teacher') {
        const info = await teacherService.login(data.teacherID, data.password)
        if (info.forbid) {
            res.send(info)
        } else {
            res.send({
                type: 'teacher',
                data: info
            })
        }
    } else if (data.type == 'manager') {
        const info = await managerService.login(data.teacherID, data.password)

        if (info.forbid) {
            res.send(info)
        } else {
            if (info[0].type == 1) {
                res.send({
                    type: 'superManager',
                    data: info
                })
            } else {
                res.send({
                    type: 'manager',
                    data: info
                })
            }
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

/**
 * 得到所有的 级别
 */
router.get('/allPosition', async (req, res) => {
    const result = await managerService.allPosition()
    res.send({ data: result })
})


/**
 * 得到项目中所有的 年
 */
router.get('/allYear', async (req, res) => {
    const result = await projectService.allYear();
    res.send({ data: result })
})

/**
 * 得到 横纵 项目的数量
 */
router.get('/typeProject', async (req, res) => {
    const result1 = await projectService.typeProject(0)
    const result2 = await projectService.typeProject(1)
    const result = [...result1, ...result2]
    let arr = [];
    for (const item of result) {
        arr.push(item.name)
    }
    res.send({
        option: {
            title: {
                text: '学校横纵项目占比',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: arr
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: result,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    })

})

module.exports = router;