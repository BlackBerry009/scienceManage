var projectDao = require('../dao/projectDao')

exports.addProject = async function(obj){
    console.log('service')
    console.log(obj)
    await projectDao.addProject(obj)
}