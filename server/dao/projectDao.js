var createConnection = require('./dbUtil');


/** 
 * 添加申请项目
 */
exports.addProject = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into Project(teacherID,teacherName,projectMembers,projectName,type,projectContent,funds,startTime,endTime,fileName,filePath,state,issue) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var params = [obj.teacherID, obj.teacherName, obj.projectMembers, obj.projectName, obj.type, obj.projectContent, obj.funds, obj.startTime, obj.endTime, obj.fileName, obj.filePath, obj.state, obj.issue];
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