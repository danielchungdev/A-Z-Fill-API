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

	conn.query('SELECT * FROM matchhistory', (error, results, fields) => {
		if (error) throw error
		res.send(results);
	});
})

app.get('/totalstats', (req, res) => {
	let wins;
	let loss;
	conn.query('SELECT (SELECT COUNT(*) FROM matchhistory WHERE result = 1) as wins, (SELECT COUNT(*) FROM matchhistory WHERE result = 2) as loss', (error, results, fields) => {
		if (error) throw error
		let data = results[0]
		wins = data.wins
		loss = data.loss
		total = wins + loss
		winrate = (wins * 100 / total).toFixed(0)
		let returnObject = {
			'wins': wins.toString(),
			'loss': loss.toString(),
			'totalgames': total.toString(),
			'winrate': winrate.toString()
		}
		res.send(returnObject)
	})
})

// app.post('/insertgame', (req, res) => {

// 	conn.query ('',(error, results, fields) => {

// 	})
// 	res.send()
// })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
