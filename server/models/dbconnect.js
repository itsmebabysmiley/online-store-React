const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shop_db",
});
connection.connect((err) => {
    if (err) throw err;
    console.log("connected to database");
});

module.exports = connection;