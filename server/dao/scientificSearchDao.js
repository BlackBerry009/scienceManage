var createConnection = require('./dbUtil');

/**
 * 申请科研成果
 */
exports.applyResults = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into ScientificResearch(projectID,teacherID,teacherName,title,type,state,fileName,filePath) values (?,?,?,?,?,?,?,?)';
        var params = [obj.projectID,obj.teacherID, obj.teacherName, obj.title, obj.type, 0, obj.fileName, obj.filePath];
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
 * 我的科研成果
 */
exports.myResults = function (teacherID) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from ScientificResearch where teacherID = ?';
        var params = [teacherID];
        conn.query(sql, params,(err,results) => {
            if (err) {
                rej(err)
            }
            else {
                res(results);
            }
        })
        conn.end();
    })
}



/**
 * 查看需要审核的科研成果
 */

exports.lookCheckReuslt = function () {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from ScientificResearch where state = 0';
        conn.query(sql, (err,results) => {
            if (err) {
                rej(err)
            }
            else {
                res(results);
            }
        })
        conn.end();
    })
}

/**
 * 同意科研成果
 */
exports.agreeReuslt = function (id) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update ScientificResearch set state = 1 where id = ?;';
        var param = [id]
        conn.query(sql, param)
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
 * 拒绝科研成果
 */
exports.rejectReuslt = function (id) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update ScientificResearch set state = 2 where id = ?;';
        var param = [id]
        conn.query(sql, param)
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