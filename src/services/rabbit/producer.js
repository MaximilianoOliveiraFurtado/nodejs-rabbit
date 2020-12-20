const amqp = require('amqplib')

module.exports = async (message) => {
  const queueName = `queueName`;
  const letterRoutingKey = `letterRoutingKey`;
  await amqp.connect(process.env.urlQueue)
  await conn.createChannel()
  await channel.assertQueue(
    queueName, 
    {
      deadLetterExchange: '',  
      deadLetterRoutingKey: letterRoutingKey,
    })
  await channel.assertQueue(letterRoutingKey)
  await channel.sendToQueue(queueName, Buffer.from(message), { persistent: true })
  return 'Queued'
}