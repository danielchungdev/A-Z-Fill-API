const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser'); 

app.use(cors());
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.json({message: 'Hello World'})
})

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})