const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lzl123",
    database: "admin_platform"
});
connection.connect();
module.exports = connection;