const getType = (value) => Object.prototype.toString.call(value).slice(8, -1)

console.log(`getType:: `, getType(null))
