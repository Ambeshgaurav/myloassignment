var mysql = require('mysql');
connection = mysql.createConnection({
    // host: process.env.HOST,
    // user: process.env.DB_USER,
    // password: '',
    // database: process.env.DATABASE
     host: "localhost",
    user: "root",
    password: '',
    database: "student"
});
connection.connect(function (err, result) {
    if (err)
        console.log("error occurred while connection in DB");
    else {
        console.log("Database connected...");
    }

});
exports.service = {
    connection: connection

}