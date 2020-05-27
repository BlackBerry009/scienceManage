var createConnection = require('./dbUtil');


/**
 * 根据工号查找信息
 */
exports.lookPassword = function (teacherID) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Teacher where teacherID = ?';
        var params = [teacherID];
        conn.query(sql, params,(err,result) => {
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
 * 注册
 */
exports.register = function (teacherID,teacherName,password,section,phone) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'insert into Teacher(`teacherID`,`teacherName`,`password`,`section`,`phone`) values (?,?,?,?,?)';
        var params = [teacherID,teacherName,password,section,phone];
        conn.query(sql, params,(err,result) => {
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

