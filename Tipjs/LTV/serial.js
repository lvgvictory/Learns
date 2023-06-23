const {
    getDataXml,
    xmlToJson,
    showJsonData
} = require('./exports')

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
