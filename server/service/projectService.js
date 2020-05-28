var projectDao = require('../dao/projectDao')
var processDao = require('../dao/processDao')
var fundsService = require('../service/fundsService')

/**
 * 我的科研
 */
exports.myProjects = async function (teacherID) {
    var res = await projectDao.myProjects(teacherID)
    return { data: res }
}

/**
 * 申报项目
 */
exports.addProject = async function (obj) {
    await projectDao.addProject(obj)
}


// ----------------------------------

/**
 * 查看需要设置审批流程的项目
 */
exports.notSet = async function () {
    var res = await projectDao.notSet();
    return { data: res }
}

/**
 * 查看 审核或结题 项目
 * type 0审核 1结题
 * section
 * currentLevel
 */
exports.checkProject = async function (obj) {
    if (obj.rank <= 2) {
        var res = await projectDao.checkProject(obj);
        return { data: res }
    } else {
        var res = await projectDao.checkProjectHigh(obj);
        return { data: res }
    }


}

/**
 * 查看需要 立项的项目
 */
exports.establishProject = async function () {
    let a = await processDao.hasChecked(0)
    if (a.length == 0) {
        return;
    } else {
        let result = [];
        for (let i = 0; i < a.length; i++) {
            let res = await projectDao.projectById(a[i].pid);
            result = result.concat(res)
        }
        return { data: result }
    }
}

/**
 * 确定   立项
 */
exports.yesEstablish = async function (id) {
    // 流程表删除
    await processDao.delete(0)
    // 更新project表状态
    await projectDao.updateState(3, id)
    // 产生随机projectID
    await projectDao.produceProjectID(id)
    //根据id找到project信息
    let info = await projectDao.projectById(id);
    await fundsService.addRecord(info[0].projectID, info[0].funds)

    return { ok: true }
}


/**
 * 进展管理的项目
 */
exports.processProject = async function (section) {
    var res = await projectDao.processProject(section)
    return { data: res }
}



/**
 * 科研汇总
 */
exports.allProject = async function () {
    //先把已经结项的项目找出来并更改状态
    let a = await processDao.hasChecked(1)
    if (a.length == 0) { }
    else {
        for (let i = 0; i < a.length; i++) {
            await projectDao.updateState(5, a[i].pid);
        }
    }
    // 找到所有为 立项后的状态的项目
    var res = await projectDao.allProject()
    console.log(res)
    return { data: res }
}


/**
 *  院 统计项目
 */
exports.projectBySection = async function (year) {
    let res = await projectDao.projectBySection(year);
    let arr = [];
    for (const prop in res[0]) {
        if (res[0].hasOwnProperty(prop)) {
            arr.push(prop)
        }
    }
    return {
        option: {
            legend: {},
            tooltip: {},
            dataset: {
                dimensions: arr,
                source: res
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {},
            series: [{
                type: 'bar'
            },
            {
                type: 'bar'
            }
            ]
        }
    }
}


/**
 * 
 */
exports.fundsBySection = async function () {
    let res = await projectDao.fundsBySection();
    let arr = [];
    for (const item of res) {
        arr.push(item.name)
    }
    return {
        option: {
            title: {
                text: '项目经费占比',
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
                    data: res,
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
    }
}

/**
 * 
 */
exports.updateInfo = async function ({ teacherName, projectMembers, projectID }) {
    let res = await projectDao.updateInfo(teacherName, projectMembers, projectID)
    return { data: res }
}

/**
 * 
 */
exports.updateState = async function (state,id) {
    let res = await projectDao.updateState(state,id)
    return { data: res }
}

/**
 *  得到所有 年
 */
exports.allYear = async function () {
    let res = await projectDao.allYear()
    return res;
}


/**
 *  得到  横纵  项目
 */
exports.typeProject = async function (type) {
    let res = await projectDao.typeProject(type)
    if (type == 1) {
        //横向
        res[0].name = '横向'
    }
    if (type == 0) {
        //纵向
        res[0].name = '纵向'
    }
    return res;
}





