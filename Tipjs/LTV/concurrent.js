const {
    getDataXml,
    xmlToJson,
    showJsonData
} = require('./exports')

async function run() {
    const tasks = []
    
    for (let i = 0; i < 4; i++) {
        tasks.push(getDataXml(`getXML ${i}`))
        tasks.push(xmlToJson(`xml to json ${i}`))
        tasks.push(showJsonData(`json data ${i}`))
    }

    const result = await Promise.all(tasks)

    console.log(`result::`, result)
}

run()
