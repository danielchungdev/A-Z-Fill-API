const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081
const cors = require('cors');
const bodyParser = require('body-parser'); 
const pool = require('./dbconn/dbconn')
const numberToPosition = require('./functions/numberToPosition')
const positionToNumber = require('./functions/positionToNumber')
const axios = require('axios')
const determineResult = require('./functions/determineResult')

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('A to Z api')
})

app.get('/testdb', (req, res) => {
	console.log("here")
	pool.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
		if (err) throw err
		
		res.send(`The solution is: ${rows[0].solution}`)
	})
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
			'position': numberToPosition(data.position),
			'amountplayed': data.count
		}
		res.send(returnObject)
	})
})

app.get('/champion/:championid', (req, res) => {
	let {championid} = req.query.championid
	pool.query(`SELECT * FROM matchhistory WHERE champion = ${championid}`, (error, results, fields) => {
    if (error) throw error
    let data = results
    res.send(data)
	})
})

app.post('/insertgame', async (req, res) => {
	const { matchid, auth } = req.body

	const counterAuth = process.env.AUTH

	if (auth !== counterAuth){
		return res.send({"message": "You're not authorize to use this API route"})
	}

	const apikey = process.env.RIOTAPI

	const { championName, individualPosition, kills, deaths, assists, win } = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/NA1_${matchid}?api_key=${apikey}`)
		.then( response =>  {
			response = response.data.info.participants
			let user;
			for (let i = 0; i < response.length; i++){
				if ( response[i].summonerName === 'Shapeless'){
					user = response[i]
					break;
				}
			}
			return user
		})
		.catch( (error) => {
			console.log(error)
		})

	pool.query (`INSERT INTO matchhistory (matchid, champion, result, position, kills, deaths, assists, screenshot) VALUES (${matchid}, '${championName}', ${determineResult(win)}, ${positionToNumber(individualPosition)}, ${kills}, ${deaths}, ${assists}, 'screenshot.aws.com')`,(error, results, fields) => {
		if (error) throw error
		let data = results
		console.log(data)
	})

	res.send({message: `Inserted match with id: ${matchid}`})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
