const mysql = require('mysql2')

// const conn = mysql.createConnection({
// 	host: "az-db.c2irzkybqtvy.us-east-1.rds.amazonaws.com",
// 	user: "root",
// 	password: "testpassword",
// 	port: 3306,
// 	database: 'azfill'
// })

const conn = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.PORT,
	database: process.env.DATABASE
})

conn.connect()
  
module.exports = conn
