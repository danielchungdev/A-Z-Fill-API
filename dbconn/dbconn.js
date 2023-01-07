const mysql = require('mysql2')

const pool = mysql.createPool({
	connectionLimit: process.env.CONNLIMIT,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.PORT,
	database: process.env.DATABASE
})
  
module.exports = pool
