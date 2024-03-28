 // MAMP
 const mysql  = require("mysql2");
 const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'jbusch',
     port: '8889' 
 });
 
 db.connect( (err)=> {
     if(err) throw err;
 });
 
 module.exports = db;
 