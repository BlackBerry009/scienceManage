var createConnection = require('./dbUtil');

/**
 * 登陆
 */
exports.login = function(mid){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select * from Manager where mid = ?';
        var params = [mid];
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
 * 按照工号查找  等级
 */
exports.searchRank = function(mid){
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'select rank,section from Manager inner join Rank where Manager.position = rank.position and Manager.mid = ?;';
        var params = [mid];
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
