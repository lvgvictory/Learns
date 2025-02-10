'use strict';

const { consumerToQueue, consumerToQueueFailed, consumerToQueueNomal } = require('./src/services/consumerQueue.service');
const queueName = 'test-topic';

// consumerToQueue(queueName).then(() => {
//     console.log(`Consumer connected to queue: ${queueName}`);
// }).catch((error) => {
//     console.error(`Error consuming queue::: `, error);
// });

consumerToQueueNomal(queueName).then(() => {
    console.log(`consumerToQueueNomal connected to queue: ${queueName}`);
}).catch((error) => {
    console.error(`Error consuming queue::: `, error);
});

consumerToQueueFailed(queueName).then(() => {
    console.log(`consumerToQueueFailed connected to queue: ${queueName}`);
}).catch((error) => {
    console.error(`Error consuming queue::: `, error);
});
