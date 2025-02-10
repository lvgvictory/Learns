'use strict';

const {
    connectToRabbitMQ,
    consumerQueue
} = require('../dbs/init.rabbit');

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { connection, channel } = await connectToRabbitMQ();
            await consumerQueue(channel, queueName);
        } catch (error) {
            console.error(`Error consuming queue::: `, error);
            throw error;
        }
    },
    consumerToQueueNomal: async (queueName) => {
        try {
            const { connection, channel } = await connectToRabbitMQ();
            const notiQueue = 'notificationQueueProcess'; // assertQueue

            // 1. TTL
            // const  timeExpire = 15000; // 15s
            // setTimeout(() => {
            //     channel.consume(notiQueue, (message) => {
            //         console.log(`Send notificationQueue successfully processed:`, message.content.toString());
            //         channel.ack(message);
            //     });
            // }, timeExpire);

            // 2. logic
            channel.consume(notiQueue, (message) => {
                try {
                    const numberTest = Math.random();
                    console.log({ numberTest });

                    if (numberTest < 0.8) {
                        throw new Error('Send notificationQueue failed:: HOT FIX');
                    }
                    
                    console.log(`Send notificationQueue successfully processed:`, message.content.toString());
                    channel.ack(message);
                } catch (error) {
                    // console.error('Send notificationQueue failed::', error);
                    channel.nack(message, false, false);
                }
            });


        } catch (error) {
            console.error(`Error consuming queue::: `, error);
            throw error;
        }
    },
    consumerToQueueFailed: async (queueName) => {
        try {
            const { connection, channel } = await connectToRabbitMQ();
            const notificationExchangeDLX = 'notificationExDLX'; // dead-letter-exchange
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'; // dead-letter-routing-key   
            const notiQueueHandler = 'notificationQueueHotFix'; // assertQueue

            await channel.assertExchange(notificationExchangeDLX, 'direct', { durable: true });

            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false,
            })

            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);
            await channel.consume(notiQueueHandler, async (messageFailed) => {
                console.log(`Send notificationQueue failed processed:`, messageFailed.content.toString());
            }, {
                noAck: true
            });
        } catch (error) {
            console.error(`Error consuming queue::: `, error);
            throw error;
        }
    }
}

module.exports = messageService;