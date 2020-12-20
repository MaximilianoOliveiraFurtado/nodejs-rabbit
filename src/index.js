const express = require('express')
const producerQueue = require('./services/rabbit/producer')
const app = express()

app.use(express.json())
app.post('/message', async (req, res) => {
  try{
    const queued = await producerQueue(req.body)
    res.sendStatus(202).json(queued)
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
})

app.listen(3001, () => console.log('listening on port 3001'))