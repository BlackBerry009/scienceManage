var createConnection = require('./dbUtil');


/** 
 * 提交报告
 * 编号
 * 分类
 * 文件
 */
exports.submitReport = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into ProcessDocuments(teacherID,teacherName,projectID,type,state,fileName,filePath) values (?,?,?,?,?)';
        var params = [obj.teacherID,obj.teacherName,obj.projectID, obj.type, 0,obj.fileName,obj.filePath];
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
  * 查看提交报告
  */
 exports.lookReport = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from ProcessDocuments where state = 0';
        conn.query(sql, (err,result) => {
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