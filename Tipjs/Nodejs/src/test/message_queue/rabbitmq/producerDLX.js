const amqp = require('amqplib');
const message = 'abc xyz';

const runProducer = async () => {
  try {
    const connection = await amqp.connect('amqp://admin:admin@localhost');
    const channel = await connection.createChannel();
    
    const notificationExchange = 'notificationEx'; // notificationEx direct
    const notiQueue = 'notificationQueueProcess'; // assertQueue
    const notificationExchangeDLX = 'notificationExDLX'; // dead-letter-exchange
    const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'; // dead-letter-routing-key

    // 1. create Exchange
    await channel.assertExchange(notificationExchange, 'direct', { durable: true });

    // 2. create Queue
    const queueResult = await channel.assertQueue(notiQueue, {
      exclusive: false, // cho phep nhieu consumer ket noi cung luc
      deadLetterExchange: notificationExchangeDLX,
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });

    // 3. bind Queue to Exchange
    await channel.bindQueue(queueResult.queue, notificationExchange);

    // 4. send message
    const msg = 'a new product';
    console.log(`Producer: ${msg}`);
    await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {
      expiration: 10000, // 10s
    });
    
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

runProducer().catch(console.error);
