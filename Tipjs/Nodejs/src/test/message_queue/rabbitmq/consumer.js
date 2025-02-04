const amqp = require('amqplib');

const runConcumer = async () => {
  try {
    const connection = await amqp.connect('amqp://admin:admin@localhost');
    const channel = await connection.createChannel();
    const queueName = 'test -topic';

    await channel.assertQueue(queueName, { durable: false });
    channel.consume(queueName, (message) => {
      console.log(`Consumer: ${message.content.toString()}`);
    }, { noAck: true });
  } catch (error) {
    console.error(error);
  }
}

runConcumer().catch(console.error);
