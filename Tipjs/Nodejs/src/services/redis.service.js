'use strict';

const redis = require('redis');
const { promisify } = require('util'); // chuyen doi 1 ham thanh promise
const { reservationInventory } = require('../models/repositoies/inventory.repo');
const redisClient = redis.createClient()

const pexpire = promisify(redisClient.pexpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setnx).bind(redisClient);

const acquireLock = async (productId, quantity, cartId) => {
  const key = `lock_v2023_:${productId}`;
  const retryTimes = 10;
  const expireTime = 3000; // 3 seconds tam lock
  for (let i = 0; i < retryTimes; i++) {
    // tao mot key, thang nao nam duoc key thi se duoc quyen mua hang
    const result = await setnxAsync(key, expireTime);
    if (result === 1) {
      // thao tac voi inventory
      const isReservation = await reservationInventory({ productId, quantity, cartId });
      
      if (isReservation.modifiedCount) {
        await pexpire(key, expireTime);
        
        return key;
      }

      return null;
    } else {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}

const releaseLock = async (keyLock) => {
  const delAsyncKey = promisify(redisClient.del).bind(redisClient);
  return await delAsyncKey(keyLock);
}

module.exports = {
  acquireLock,
  releaseLock
}