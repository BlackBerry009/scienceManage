var processDocumentsDao = require('../dao/processDocumentsDao');
var projectDao = require('../dao/projectDao')

/**
 * 申请提交报告
 */
exports.submitReport = async function(obj){
    await processDocumentsDao.submitReport(obj)
}

/**
 * 查看提交报告
 */
exports.lookReport = async function(){
    var res = await processDocumentsDao.lookReport()
    return {data:res}
}


/**
 * 审核 报告
 * 通过／拒绝
 */
exports.checkReport = async function(id,state,projectID){
    console.log(id,state,projectID)
    await processDocumentsDao.checkReport(id,state)
    await projectDao.updateStateByProjectID(4,projectID)
    return {ok:true}
}