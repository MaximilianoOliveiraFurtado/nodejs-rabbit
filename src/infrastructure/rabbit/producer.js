const amqp = require('amqplib')

module.exports = async (message) => {
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
  return await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true })
}