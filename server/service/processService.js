var processDao = require('../dao/processDao')
var projectDao = require('../dao/projectDao')


/**
 * 设置审批流程
 */
exports.setProcess = async function(obj1,obj2){
    await processDao.setCheckProcess(obj1)
    await processDao.setEndProcess(obj2)
    await projectDao.hasSet(obj1.pid)
}

/**
 * 逐级通过 审核 或 结题
 */
exports.yesProcess = async function(pid,type){
    await processDao.yesProcess(pid,type)
}


/**
 * 拒绝 审核 或 结题
 */
exports.noProcess = async function(pid,type){
    await processDao.noProcess(pid,type)
}

/**
 * 找到 审核 或 结题 通过的pid
 * 即currentLevel=setLevel
 */
exports.hasChecked = async function (type) {
    let res =  await processDao.hasChecked(type)
    return res;
}





