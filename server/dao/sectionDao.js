var createConnection = require('./dbUtil');


/**
 * 查找所有院名
 */
exports.allSection = function () {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select sectionName from Section ';
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