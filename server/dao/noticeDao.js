var createConnection = require('./dbUtil');

/** 
 * 通知查看
 */
exports.lookNotice = function (teacherID) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'select * from Notice where teacherID = ?';
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
  * 通知信息发布
  */

 exports.publish = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'insert into Notice (`title`,`content`,`recipient`,`time`,`teacherID`) values (?,?,?,?,?)' ;
        var params = [obj.title,obj.content,obj.recipient,obj.time,obj.teacherID];
        conn.query(sql, params)

        conn.end((err)=>{
            if (err) {
                rej(err)
            }
            else {
                res();
            }
        }); 
    })
}