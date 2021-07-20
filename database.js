var mysql = require('mysql2');

var connection = mysql.createConnection({
    user: "USERNAME_TO_DATABASE",
    password: 'PASS_TO_DATABASE',
    database: 'DATABASE'
});

connection.connect(function(err) {
    if (err) throw err;
    
});

module.exports = connection;