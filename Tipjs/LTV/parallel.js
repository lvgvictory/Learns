const {
    getDataXml,
    xmlToJson,
    showJsonData
} = require('./exports')

const cluster = require('cluster')

const process = require('process')
const numWorkers = require('os').cpus().length

console.log(`numWorkers::`, numWorkers)

if (cluster.isMaster) {
    // for numWorkers
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
} else {
    async function run() {
        for (let i = 0; i < 4; i++) {
            const xml = await getDataXml(`getXML ${i}`)
            console.log(xml)
            const json = await xmlToJson(`xml to json ${i}`)
            console.log(json)
            const data = await showJsonData(`json data ${i}`)
            console.log(data)
        }
    }
    
    run()
}