var teacherDao = require('../dao/teacherDao')

const crypto = require('crypto');
function hmac(data){
  let hmac = crypto.createHmac('md5','后台传入/任意值');
  return hmac.update(data).digest('base64');
}


exports.login = async function(teacherID,password){
    var info = await teacherDao.lookPassword(teacherID)
    let mima = hmac(password);
    if(info.length != 0 && info[0].password == password){
        return info
    } else{
        return { forbid: true }
    }
}


exports.register = async function({teacherID,teacherName,password,section,phone}){
    var info = await teacherDao.register(teacherID,teacherName,password,section,phone)
    return info;
}
