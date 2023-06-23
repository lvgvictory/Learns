const promiseFunc = message => {
    return new Promise(resolve => {
        // code to collect
        resolve(message)
    })
}

const getDataXml = async (message) => {
    return promiseFunc(message)
}

const xmlToJson = async (message) => {
    return promiseFunc(message)
}

const showJsonData = async (message) => {
    return promiseFunc(message)
}

module.exports = {
    getDataXml,
    xmlToJson,
    showJsonData
}
