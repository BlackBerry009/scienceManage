var projectDao = require('../dao/projectDao')
var processService = require('../dao/processDao')

/**
 * 我的科研
 */
exports.myProjects = async function(teacherID){
    var res = await projectDao.myProjects(teacherID)
    return {data:res}
}

/**
 * 申报项目
 */
exports.addProject = async function(obj){
    await projectDao.addProject(obj)
}


// ----------------------------------

/**
 * 查看需要设置审批流程的项目
 */
exports.notSet = async function(){
    var res = await projectDao.notSet();
    return {data:res}
}

/**
 * 查看 申报审核项目
 * type 0审核 1结题
 * section
 * currentLevel
 */
exports.checkProject = async function(obj){
    if(obj.rank <= 2){
        var res = await projectDao.checkProject(obj);
        return {data:res}
    } else {
        var res = await projectDao.checkProjectHigh(obj);
        return {data:res}
    }

    
}



/**
 * 查看需要 立项的项目
 */
exports.establishProject = async function(){
    let a = await processService.hasChecked(0)
    let res = await projectDao.projectById(a[0].pid);
    return {data:res}
}

/**
 * 确定   立项
 */
exports.yesEstablish = async function(){
    
    return {data:res}
}


/**
 * 进展管理的项目
 */
exports.processProject = async function(){
    var res = await projectDao.processProject()
    return {data:res}
}







/**
 * 科研汇总
 */
exports.allProject = async function(){
    var res = await projectDao.allProject()
    return {data:res}
}