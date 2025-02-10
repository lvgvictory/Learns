'use strict';

const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://admin:admin@localhost');

        if (!connection) {
            throw new Error('Connection to RabbitMQ failed');
        }

        const channel = await connection.createChannel();
        // await channel.assertQueue('jobs');
        return {
            connection,
            channel
        }
    } catch (error) {
        console.error(error);
    }
}

const connectToRabbitMQForTest = async () => {
    try {
        const { connection, channel } = await connectToRabbitMQ();

        // publish a message to the queue
        const queue = 'test-queue';
        const message = 'Hello World';
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        // close the connection
        await connection.close();
    } catch (error) {
        console.error(`Error connecting to RabbitMQ::: `, error);
    }
}

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, { durable: true });
        console.log('Waiting for messages in the queue...');
        await channel.consume(queueName, (message) => {
            console.log(`Received message: ${queueName} :::: ${message.content.toString()}`);
            // 1. find user folowing the shop
            // 2. send notification to user
            // 3. yes, ok => success
            // 4. no, setup DLX ...
        }, {
            noAck: true
        });
    } catch (error) {
        console.error(`Error consuming queue::: `, error);
        throw error;
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue
}