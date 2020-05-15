var managerDao = require('../dao/managerDao')

/**
 * 登陆
 */
exports.login = async function(mid){
    var res = await managerDao.login(mid);
    return res;
}


/**
 * 按照工号 查找等级
 */
exports.searchRank = async function(mid){
    var res = await managerDao.searchRank(mid);
    return res;
}