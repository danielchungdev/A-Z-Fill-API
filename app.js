const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081
const cors = require('cors');
const bodyParser = require('body-parser'); 
const pool = require('./dbconn/dbconn')
const positionSwitch = require('./functions/positionswitch')

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('A to Z api')
})

app.get('/testdb', (req, res) => {

	pool.query('SELECT * FROM matchhistory', (error, results, fields) => {
		if (error) throw error
		res.send(results);
	});
})

app.get('/totalstats', (req, res) => {
	let wins;
	let loss;
	pool.query(`SELECT (SELECT COUNT(*) FROM matchhistory WHERE result = 1) as wins, (SELECT COUNT(*) FROM matchhistory WHERE result = 2) as loss`, (error, results, fields) => {
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

app.get('/mostplayedposition', (req, res) => {

	pool.query(`SELECT position, COUNT(position) as 'count' FROM matchhistory GROUP BY position ORDER BY 'count' DESC LIMIT 1`, (error, results, fields) => {
		if (error) throw error
		let data = results[0]
		let returnObject = {
			'position': positionSwitch(data.position),
			'amountplayed': data.count
		}
		res.send(returnObject)
	})

})

app.get('/champion/:championid', (req, res) => {
	
	pool.query(``, (error, results, fields) => {

	})
	
	res.send({})
})

app.post('/insertgame', (req, res) => {

	conn.query ('',(error, results, fields) => {

	})
	res.send({})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
