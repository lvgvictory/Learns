'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const {db: { host, name, port }} = require('../configs/config.mongodb')


const connectString = `mongodb://${host}:${port}/${name}`

console.log(`connectString::`, connectString)

class Database {
  constructor() {
    this.connect()
  }

  // Connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose.connect(connectString, {
      maxPoolSize: 100
    })
      .then(_ => console.log(`Connected Mongodb Success::`, countConnect()))
      .catch(err => console.log(`Error Connect! => ${err.message}`))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
