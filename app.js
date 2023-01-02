const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081
const cors = require('cors');
const bodyParser = require('body-parser'); 
const conn = require('./dbconn/dbconn')

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('A to Z api')
})

app.get('/testdb', (req, res) => {
	conn.query('SELECT * from matchhistory', function (error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results[0].solution);
	});
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
