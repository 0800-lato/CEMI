const fs = require('fs')
const path = require('path')

function getData(file = "") {
    const json = fs.readFileSync(path.join(__dirname, file), 'utf-8');
    return JSON.parse(json)
}

function storeData(array = [],file = "") {
    const arrayJSON = JSON.stringify(array,null,2)
    fs.writeFileSync(path.join(__dirname, file),arrayJSON, 'utf-8')
    return null
}

module.exports = {
    getData,
    storeData
}