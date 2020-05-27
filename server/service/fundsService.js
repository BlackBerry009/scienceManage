var fundsDao = require('../dao/fundsDao')

/**
 * 插入经费记录
 */
exports.addRecord = async function(projectID,fundsReceived){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var time = year + '-' + month + '-' + day;
    var obj = {
        projectID: projectID,
        paymentDate: time,
        fundsReceived: fundsReceived
    }
    await fundsDao.addRecord(obj)
}