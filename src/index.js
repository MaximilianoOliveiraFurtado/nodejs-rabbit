require('dotenv').config()
const express = require('express')
const producerQueue = require('./infrastructure/rabbit/producer')
const consumerQueue = require('./infrastructure/rabbit/consumer')
const app = express()

app.use(express.json())
app.post('/message', async (req, res) => {
  try{
    const queued = await producerQueue(req.body)
    res.status(202).json('queued')
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
})

consumerQueue()
app.listen(3001, () => console.log('listening on port 3001'))