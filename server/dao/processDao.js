var createConnection = require('./dbUtil');

/**
 * 设置 审核流程
 * pid
 * setLevel
 */
exports.setCheckProcess = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'insert into Process(`pid`,`setLevel`,`currentLevel`,`type`) values (?,?,?,?)';
        var params = [obj.pid,obj.setLevel,0,0];
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
 * 设置 结题流程
 */
exports.setEndProcess = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'insert into Process(`pid`,`setLevel`,`currentLevel`,`type`) values (?,?,?,?)';
        var params = [obj.pid,obj.setLevel,0,1];
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
 * 逐级通过 审核 或 结题
 */
exports.yesProcess = function (pid,type) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Process set currentLevel = currentLevel + 1 where pid = ? and type = ?';
        var params = [pid,type];
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
 * 拒绝 审核 或 结题
 */
exports.noProcess = function (pid,type) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update Process set currentLevel = -1 where pid = ? and type = ?';
        var params = [pid,type];
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
 * 找到 审核 或 结题 通过的pid
 * 即currentLevel=setLevel
 */
exports.hasChecked = function (type) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select pid from Process where currentLevel = setLevel and type = ?;';
        var params = [type];
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