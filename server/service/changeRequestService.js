var changeRequestDao = require('../dao/changeRequestDao');

/**
 * 申请变更项目内容
 */
exports.changeProject = async function(obj){
    await changeRequestDao.changeProject(obj);
}


/**
 * 查看变更申请
 */
exports.lookApply = async function(){
    var res = await changeRequestDao.lookApply();
    return {data:res}
}