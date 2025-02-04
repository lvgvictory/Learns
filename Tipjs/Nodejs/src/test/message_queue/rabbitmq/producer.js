const amqp = require('amqplib');
const message = 'Hello World!';

const runProducer = async () => {
  try {
    const connection = await amqp.connect('amqp://admin:admin@localhost');
    const channel = await connection.createChannel();
    const queueName = 'test -topic';

    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Producer: ${message}`);

    // setTimeout(() => {
    //   connection.close();
    //   process.exit(0);
    // }, 500);
  } catch (error) {
    console.error(error);
  }
}

runProducer().catch(console.error);
