var createConnection = require('./dbUtil');


/** 
 * 申请变更项目内容
 * 编号
 * 名称
 * 负责人
 * 内容
 */
exports.changeProject = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into ChangeRequest(projectID,projectName,teacherID,teacherName,changeContent,state,issue) values (?,?,?,?,?,?,?)';
        var params = [obj.projectID,obj.projectName,obj.teacherID, obj.teacherName, obj.changeContent, 0, ''];
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
 * 查看变更申请
 */
exports.lookApply = function () {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from ChangeRequest where state = 0';
        conn.query(sql,(err,result) => {
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
 *  审核
 */
exports.check = function (id,state) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update ChangeRequest set state = ? where id = ?';
        var params = [state,id]
        conn.query(sql,params,(err,result) => {
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