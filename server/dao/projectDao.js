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
 * 更新项目状态by id
 */
exports.updateState = function(state,id){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Project set state = ? where id = ?';
        var params = [state,id]
        conn.query(sql,params)
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
 * 更新项目状态by projectID
 */
exports.updateStateByProjectID = function(state,projectID){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Project set state = ? where projectID = ?';
        var params = [state,projectID]
        conn.query(sql,params)
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
 * 生成项目编号
 */
exports.produceProjectID = function(id){
    var date = new Date().getTime();
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Project set projectID = ? where id = ?';
        console.log(date)
        var params = [date,id]
        conn.query(sql,params)
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
 * 进展管理的项目
 */
exports.processProject = function(section){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Project where state = 3 and section = ?';
        var params = [section]
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
 * 项目 结题
 */
exports.endProject = function(section){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Project where state = 4 and section = ?';
        var params = [section]
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
 * 科研汇总
 */
exports.allProject = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Project where state >= 3';
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
 * 按 院统计项目
 */
exports.projectBySection = function(year){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select section as 'section', count(*) as '申报数量', count(state >= 3 or null) as '立项数量' from Project where year(startTime) = ? group by section; ";
        var params = [year]
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
 * 按 院统计 经费
 */
exports.fundsBySection = function(year){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select section as name, sum(f.fundsReceived) as value from Project as p inner join FundManagement as f where p.projectID = f.projectID and year(startTime) = ? group by section;";
        var params = [year]
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
 * 按照projectID修改 teacherName和Members
 */
exports.updateInfo = function(teacherName,projectMembers,projectID){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect(); 
        var sql = "update Project set teacherName = ? ,projectMembers = ? where projectID = ?;";
        var params = [teacherName,projectMembers,projectID]
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
 * 得到  所有 年 
 */
exports.allYear = function(){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select distinct year(startTime) as year from Project;";
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
 * 得到项目的  横纵  项目
 */

exports.typeProject = function(type){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = "select sum(type=?) as value from Project;";
        var params = [type];
        conn.query(sql,[params],(err,result)=>{
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










