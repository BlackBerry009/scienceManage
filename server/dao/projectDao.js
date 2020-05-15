var createConnection = require('./dbUtil');

/**
 * 我的科研
 */
exports.myProjects = function(teacherID){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Project where teacherID = ?';
        var params = [teacherID];
        conn.query(sql, params,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

/** 
 * 添加申请项目
 */
exports.addProject = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into Project(teacherID,teacherName,section,projectMembers,projectName,type,projectContent,funds,startTime,endTime,fileName,filePath,state,issue,isVet) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var params = [obj.teacherID, obj.teacherName, obj.section,obj.projectMembers, obj.projectName, obj.type, obj.projectContent, obj.funds, obj.startTime, obj.endTime, obj.fileName, obj.filePath, 0, '',0];
        conn.query(sql, params)

        conn.end(err => {
            if (err) {
                rej(err)
            }
            else {
                res();
            }
        }); 
    })
}

/**
 * 院级
 * 按照管理员等级 查看申报审核 或者 结题 的项目 
 * type 0审核 1结题
 * section
 * currentLevel
 */

exports.checkProject = function(obj){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Process inner join Project  where Process.type = ? and Process.pid = Project.id and section= ? and currentLevel = ? and currentLevel <> setLevel;';
        var params = [obj.type,obj.section,obj.currentLevel];
        conn.query(sql,params,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

/**
 * 校级 查看申报审核 或者 结题 的项目 
 */
exports.checkProjectHigh = function(obj){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Process inner join Project  where Process.type = ? and Process.pid = Project.id  and currentLevel = ? and currentLevel <> setLevel;';
        var params = [obj.type,obj.currentLevel];
        conn.query(sql,params,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

/**
 * 查看需要设置审批的项目
 */

exports.notSet = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Project where isVet = 0';
        conn.query(sql,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}


// 已设置审批流程
exports.hasSet = function(id){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Project set isVet = 1 where id = ?;';
        var params = [id];
        conn.query(sql,params,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

exports.projectById = function(id){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Project where id = ?;';
        var params = [id];
        conn.query(sql,params,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

/**
 * 需要立项的项目
 */
exports.establishProject = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = '';
        conn.query(sql,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}


/**
 * 进展管理的项目
 */
exports.processProject = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Project where state = 3';
        conn.query(sql,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}

 /**
  * 结题的项目
  */



/**
 * 科研汇总
 */
exports.allProject = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Project where state >= 2';
        conn.query(sql,(err,result)=>{
            if (err) {
                rej(err)
            }
            else {
                res(result);
            }
        })
        conn.end(); 
    })
}











