const amqp = require('amqplib')

module.exports = async () => {
  const queueName = `queueName`
  const letterRoutingKey = `dlqName`
  const conn = await amqp.connect(process.env.urlQueue)
  const channel = await conn.createChannel()
  await channel.assertQueue(
    queueName, 
    {
      deadLetterExchange: '',  
      deadLetterRoutingKey: letterRoutingKey,
    }
  )
  await channel.assertQueue(letterRoutingKey)
  await channel.prefetch(50)
  const consumer = await channel.consume(queueName, async (fetched) => {
    const {name, age} = JSON.parse(fetched.content.toString())
    if( age > 30 || age < 25 ) {
      await channel.nack(fetched, false, false)
      console.log('Unprocessed message added to dlq: invalid age', {name, age}) 
    } else {
      await channel.ack(fetched)
      console.log('Message successfully processed', {name, age}) 
    }
  })
}