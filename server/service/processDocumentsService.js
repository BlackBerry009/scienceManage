var processDocumentsDao = require('../dao/processDocumentsDao');

/**
 * 申请提交报告
 */
exports.submitReport = async function(obj){
    console.log(obj)
    await processDocumentsDao.submitReport(obj)
}

/**
 * 查看提交报告
 */
exports.lookReport = async function(){
    var res = await processDocumentsDao.lookReport()
    return {data:res}
}