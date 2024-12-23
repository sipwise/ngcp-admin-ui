const fs = require('fs')
const path = require('path')
const jsonBeautify = require('json-beautify')
const _ = require('lodash')
const po2json = require('po2json')

function normalizeKey (key) {
    return key.replace(/%([1-9])/g, (value, ref) => {
        return `{${parseInt(ref) - 1}}`
    })
}

if (process.argv[2] === undefined || process.argv[2] === null || _.trim(process.argv[2]) === '') {
    // eslint-disable-next-line no-console
    console.log('Error: First Argument (path to ngcp-panel repository) is missing')
    process.exit(1)
}

const pathArg = path.resolve(process.argv[2])
if (!fs.existsSync(pathArg)) {
    // eslint-disable-next-line no-console
    console.log('Error: Given path %s does not exist', pathArg)
    process.exit(1)
}

const sourceFolder = path.join(pathArg, 'lib/NGCP/Panel/I18n')
const targetFolder = path.resolve(path.join(__dirname, '../src/i18n'))

// eslint-disable-next-line no-console
console.log('Inspecting %s for .po files', sourceFolder)

const poFiles = fs.readdirSync(sourceFolder)
poFiles.forEach((poFile) => {
    let language = poFile.split('.')[0]
    if (poFile === 'messages.pot') {
        language = 'en'
    }
    const targetFile = `${targetFolder}/${language}.json`
    const poFilePath = `${sourceFolder}/${poFile}`
    try {
        if (poFile.match(/\.po$/) || poFile.match(/\.pot$/)) {
            const poObject = po2json.parseFileSync(`${sourceFolder}/${poFile}`)
            // eslint-disable-next-line no-console
            console.log(`Parsed ${poFilePath}`)
            let targetFileObject = {}
            if (fs.existsSync(targetFile)) {
                targetFileObject = JSON.parse(`${fs.readFileSync(targetFile)}`)
                // eslint-disable-next-line no-console
                console.log(`Parsed ${targetFile}`)
            }
            const poTranslations = {}
            Object.keys(poObject).forEach((poKey) => {
                const normalizedPoKey = normalizeKey(poKey)
                if (poKey !== '') {
                    if (poFile === 'messages.pot') {
                        poTranslations[normalizedPoKey] = normalizedPoKey
                    } else {
                        poTranslations[normalizedPoKey] = normalizeKey(poObject[poKey][1])
                    }
                }
            })
            const mergedTranslation = _.merge({}, targetFileObject, poTranslations)
            const mergedTranslationJson = jsonBeautify(mergedTranslation, null, 4, 100)
            fs.writeFileSync(targetFile, mergedTranslationJson)
            // eslint-disable-next-line no-console
            console.log('Merged translations %s %s', poFilePath, targetFile)
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Could not merge %s %s', poFilePath, targetFile)
        // eslint-disable-next-line no-console
        console.log(err)
    }
})

// eslint-disable-next-line no-console
console.log('Finished translation import from %s', sourceFolder)
