var noticeDao = require('../dao/noticeDao')

/**
 * 通知查看
 */
exports.lookNotice = async function(teacherID){
    var res = await noticeDao.lookNotice(teacherID);
    return {data:res}
}

/**
 * 发布通知
 */
exports.publish = async function(obj){
    await noticeDao.publish(obj);
}