
const generatorsTypes = {}

export function generateStore (storeModule) {
    const configurationsByType = storeModule?.generatorConfig || {}
    Object.entries(configurationsByType).forEach(([generatorType, generatorConfig]) => {
        const { generatorFunction } = getGeneratorInfo(generatorType)

        storeModule = generatorConfig.reduce((sModule, configItem) => {
            return generatorFunction(sModule, configItem)
        }, storeModule)
    })

    const subModules = storeModule?.modules
    if (typeof subModules === 'object') {
        Object.keys(subModules).forEach(moduleName => {
            if (typeof subModules[moduleName] === 'object') {
                subModules[moduleName] = generateStore(subModules[moduleName])
            }
        })
    }

    return storeModule
}

/**
 * Extract components of the store generator name
 * @param fullName {string} - a string like "[<generatorType>:]<namespace>/<generatorName>"
 * @param [defaultGeneratorType] {string} - will be used if "generator type" is absent in fullName
 * @returns {{generatorType: string, namespace: string, generatorName: string}}
 */
export function parseGeneratorFullName (fullName, defaultGeneratorType = '') {
    const [typeAndNamespace, generatorName] = (fullName || '').split('/')
    const [namespace, generatorType] = [...typeAndNamespace.split(':').reverse(), defaultGeneratorType]
    return { generatorType, namespace, generatorName }
}

export function storeGeneratorNames ({ namespace, generatorName, generatorType }) {
    const { namesFunction } = getGeneratorInfo(generatorType)
    return namesFunction({ namespace, generatorName })
}

function getGeneratorInfo (generatorType) {
    if (!generatorType) {
        throw new Error('Store Generator Type is missing')
    }

    const info = generatorsTypes[generatorType]
    if (typeof info !== 'object') {
        throw new Error(`Unknown Store Generator Type: "${generatorType}"`)
    }
    return info
}

export function checkExistence ({ storeModule, element, subElement, generatorName }) {
    if (storeModule?.[element]?.[subElement] !== undefined) {
        throw new Error(`"${subElement}" is already exist in store ${element} (store generator name "${generatorName}")`)
    }
}

export function registerStoreGeneratorType (typeName, { namesFunction, generatorFunction }) {
    if (typeof typeName !== 'string' || !typeName) {
        throw new Error('Store Generator Type name should be not an empty string')
    }
    if (generatorsTypes[typeName]) {
        throw new Error(`Store Generator Type with "${typeName}" is already registered`)
    }
    if (typeof namesFunction !== 'function' || typeof generatorFunction !== 'function') {
        throw new Error('To register a Store Generator Type you should pass "namesFunction" and "generatorFunction" functions ')
    }
    generatorsTypes[typeName] = { namesFunction, generatorFunction }
}
