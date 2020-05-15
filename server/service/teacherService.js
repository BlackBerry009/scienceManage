var teacherDao = require('../dao/teacherDao')

exports.login = async function(teacherID){
    var info = await teacherDao.lookPassword(teacherID)
    return info;
}