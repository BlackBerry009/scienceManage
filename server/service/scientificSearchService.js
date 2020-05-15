var scientificSearchDao = require('../dao/scientificSearchDao');

/**
 * 申请科研成果
 */
exports.applyResults = async function(obj){
    console.log(obj)
    await scientificSearchDao.applyResults(obj);
}

/**
 * 我的科研成果
 */
exports.myResults = async function(teacherID){
    var res = await scientificSearchDao.myResults(teacherID);
    return {data:res}
}

/**
 * 查看需要审核的科研成果
 */
exports.lookCheckResult = async function(){
    var res = await scientificSearchDao.lookCheckReuslt()
    return {data:res}
}

/**
 * 同意科研成果
 */
exports.agreeResult = async function(id){
    await scientificSearchDao.agreeReuslt(id)
    return {ok:true}
}

/**
 * 拒绝科研成果
 */
exports.rejectResult = async function(id){
    await scientificSearchDao.rejectReuslt(id)
    return {ok:true}
}