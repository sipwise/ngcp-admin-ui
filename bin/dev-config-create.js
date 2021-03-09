const path = require('path')
const fs = require('fs')

const hostName = process.argv[2]
quasarConfig(hostName)
appConfig()

function quasarConfig (hostName) {
    const filePathTemplate = path.join(__dirname, '../quasar.conf.dev.proxy.js')
    const filePathConfig = path.join(__dirname, '../quasar.conf.dev.js')
    const template = fs.readFileSync(filePathTemplate, 'utf8')
    const rendered = template.split('{{sipwiseVoipPlatformIPorFDQN}}').join(hostName)
    fs.writeFileSync(filePathConfig, rendered)
    console.log('Created Quasar development server config:', path.basename(filePathConfig))
}

function appConfig () {
    const filePathTemplate = path.join(__dirname, '../src/config/app.dev.proxy.js')
    const filePathConfig = path.join(__dirname, '../src/config/app.js')
    const template = fs.readFileSync(filePathTemplate, 'utf8')
    const rendered = template
    fs.writeFileSync(filePathConfig, rendered)
    console.log('Created application config:', path.basename(filePathConfig))
}
