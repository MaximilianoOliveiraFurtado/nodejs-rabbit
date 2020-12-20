const express = require('express')
const app = express()

app.use(express.json())
app.post('/message', (req, res) => {
  console.log(req.body)
  res.sendStatus(202)
})

app.listen(3001, () => console.log('listening on port 3001'))