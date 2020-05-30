var managerDao = require('../dao/managerDao')

const crypto = require('crypto');
function hmac(data){
  let hmac = crypto.createHmac('md5','后台传入/任意值');
  return hmac.update(data).digest('base64');
}

exports.register = async function({mid,name,password,position,section}){
    var info = await managerDao.register(mid,name,password,position,section)
    return info;
}

/**
 * 登陆
 */
exports.login = async function(mid,password){
    var res = await managerDao.login(mid);
    console.log(res)
    let mima = hmac(password);
    if(res.length != 0 && res[0].password == password){
        return res;
    } else {
        return {forbid: true}
    }
    
}


/**
 * 按照工号 查找等级
 */
exports.searchRank = async function(mid){
    var res = await managerDao.searchRank(mid);
    return res;
}


/**
 * 找到所有级别
 */
exports.allPosition = async function(){
    var res = await managerDao.allPosition();
    return res;
}