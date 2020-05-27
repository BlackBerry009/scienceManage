var createConnection = require('./dbUtil');


/** 
 * 插入经费记录
 * projectID
 * paymentDate
 * fundsReceived
 */
exports.addRecord = function (obj) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = 'insert into FundManagement(projectID,paymentDate,fundsReceived) values (?,?,?)';
        var params = [obj.projectID,obj.paymentDate,obj.fundsReceived];
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


