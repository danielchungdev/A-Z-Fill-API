const mysql = require('mysql2')

const pool = mysql.createPool({
	connectionLimit: 100, 
	host: "az-db.c2irzkybqtvy.us-east-1.rds.amazonaws.com",
	user: "root",
	password: "testpassword",
	port: 3306,
	database: "azfill"
})

// const pool = mysql.createPool({
// 	connectionLimit: process.env.CONNLIMIT,
// 	host: process.env.HOST,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	port: process.env.PORT,
// 	database: process.env.DATABASE
// })
  
module.exports = pool
