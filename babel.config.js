const fs = require('fs-extra')

let extend
/**
 * The .babelrc file has been created to assist Jest for transpiling.
 * You should keep your application's babel rules in this file.
 */
if (fs.existsSync('./.babelrc')) {
    extend = './.babelrc'
}

module.exports = function (api) {
    // Use api.cache with a stable key or boolean
    // This ensures caching is consistent and only configured once
    api.cache(() => process.env.NODE_ENV)

    const isNode = api.caller((c) => c && c.target === 'node')

    return {
        presets: [
            ['@quasar/babel-preset-app', isNode ? { targets: { node: 'current' } } : {}]
        ],
        extends: extend
    }
}
