function parseArray(mongooses) {
    return mongooses.map(mongoose => mongoose.toObject())
}

function parseObject(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
}

module.exports = {
    parseArray,
    parseObject
}
