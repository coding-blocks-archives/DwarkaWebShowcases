const mysql = require('mysql');

dbconfig={
    host:'sql12.freemysqlhosting.net',
    user:'sql12198734',
    password:'YymAbz5TYs',
    database:'sql12198734'
}
// sql12.freemysqlhosting.net

// 
// dbconfig={
//     host:'localhost',
//     user:'newuser',
//     password:'password',
//     database:'music'
// }

function sqlQuery(query,callback) {
    var connection=mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,function(err,rows){
        if (err){throw err}
        callback(rows);
        connection.end();
    })
}

module.exports = {
    sqlQuery
};
