const fs = require('fs')
const packageFile = require('./package.json')
const config = require("./src/config.json");

const environment = config.environment;
const homepage = config.currentUrl[environment];


function changeProdMode() {
    console.log(`---\nSetting up ${environment} environment`)
    console.log(`Changing homepage in package.json to ${homepage}`)    
    packageFile.homepage = homepage+"/";

    fs.writeFileSync('./package.json', JSON.stringify(packageFile, null, 2), (err) => {
        console.log(err)
    })
}


changeProdMode()