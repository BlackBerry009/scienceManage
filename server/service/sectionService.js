var sectionDao = require('../dao/sectionDao')

exports.allSection = async function(){
    var info = await sectionDao.allSection()
    return info;
}