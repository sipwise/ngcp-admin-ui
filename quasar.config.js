/* eslint-env node */
/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

import ESLintPlugin from 'eslint-webpack-plugin'
import express from 'express'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'
import { configure } from 'quasar/wrappers'
import webpack from 'webpack'
const devServerConfig = require('./quasar.config.dev')

module.exports = configure(function (/* ctx */) {
    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        // the order matters, so be careful when adding new boot files
        boot: [
            'errorHandling', // "errorHandling" should be the first boot file to begin catching errors earlier
            'store',
            'appConfig',
            'i18n',
            'api',
            'auth',
            'router',
            'user',
            'route-helper',
            'acl',
            'vuelidate',
            'sanatizer',
            'vue-wait',
            'vue-word-highlighter',
            'vue-json-pretty',
            'portal-vue',
            'filters',
            'creation-session',
            'proxy-autorefresh-context',
            'e2e-testing',
            'help-button'
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: [
            'app.sass'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons' // optional, you are not bound to it
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            iconSet: 'material-icons', // Quasar icon set
            lang: 'en-US', // Quasar language pack

            // Possible values for "all":
            // * 'auto' - Auto-import needed Quasar components & directives
            //            (slightly higher compile time; next to minimum bundle size; most convenient)
            // * false  - Manually specify what to import
            //            (fastest compile time; minimum bundle size; most tedious)
            // * true   - Import everything from Quasar
            //            (not treeshaking Quasar; biggest bundle size; convenient)
            all: 'auto',

            components: [],
            directives: [],

            // Quasar plugins
            plugins: [
                'LocalStorage',
                'SessionStorage',
                'Notify',
                'Dialog',
                'AppFullscreen',
                'Meta',
                'Cookies'
            ]
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            env: {
                ...process.env
            },

            publicPath: process.env.NODE_ENV === 'production'
                ? '/v2/'
                : (devServerConfig.publicPath || '/v2/'),
            vueRouterMode: 'hash',

            // rtl: false, // https://quasar.dev/options/rtl-support
            // showProgress: false,
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            // preloadChunks: false,
            // extractCSS: false,

            // Configuring how Webpack generates filenames for the built JavaScript files
            extendWebpack (cfg) {
                cfg.output = {
                    ...cfg.output,
                    filename: '[name].js',
                    chunkFilename: '[name].js'
                }
            },

            chainWebpack (chain) {
                // Handle ESM and CommonJS modules not to encounter
                // import issues with modern packages,
                // especially those that provide dual ESM/CommonJS distributions or use the .mjs extension
                chain.module
                    .rule('mjs-esm')
                    .test(/\.m?js$/)
                    .resolve.set('fullySpecified', false).end()
                    .type('javascript/auto')

                // Basic webpack configuration
                chain.resolve.fallback
                    .merge({
                        crypto: 'crypto-browserify',
                        stream: 'stream-browserify',
                        buffer: 'buffer',
                        vm: false,
                        process: false
                    })

                // Plugins in order of dependency

                // This configuration is essential for browser compatibility with Node.js modules
                chain.plugin('provide')
                    .use(webpack.ProvidePlugin, [{
                        Buffer: ['buffer', 'Buffer'],
                        process: ['process']
                    }])

                // removing/filtering unused Moment's locale files from final build
                chain.plugin('moment-locales')
                    .use(MomentLocalesPlugin, [{
                        localesToKeep: ['en', 'de', 'es', 'fr', 'it']
                    }])

                chain.plugin('eslint')
                    .use(ESLintPlugin, [{
                        files: ['src/**/*.js', 'src/**/*.vue'],
                        cache: true,
                        // Add these options to prevent triggering recompilation:
                        lintDirtyModulesOnly: true, // Only lint files that have changed
                        emitWarning: true, // Don't fail on warnings
                        emitError: false,
                        threads: false // Disable thread worker (can cause issues)
                    }])

                const env = {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                    ...process.env
                }

                chain.plugin('define')
                    .use(webpack.DefinePlugin, [{
                        // Quasar CLI specific globals
                        // Added to resolve errors with Quasar CLI
                        __QUASAR_VERSION__: '"2.18.1"', // Hardcoded version to avoid require issues
                        __QUASAR_SSR__: true,
                        __QUASAR_SSR_SERVER__: false,
                        __QUASAR_SSR_CLIENT__: false,
                        __QUASAR_SSR_PWA__: true,
                        'process.env': JSON.stringify(env),
                        // Vue specific globals
                        __VUE_OPTIONS_API__: true,
                        __VUE_PROD_DEVTOOLS__: false,
                        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
                    }])
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            https: false,
            port: 8081,
            open: false,
            devMiddleware: {},
            ...(!devServerConfig.proxyAPI2localhost
                ? {}
                : {
                    https: true,
                    proxy: [
                        {
                            context: [`!${devServerConfig.publicPath || '/v2/'}`],
                            target: devServerConfig.proxyAPIFromURL,
                            secure: false
                        }
                    ],
                    setupMiddlewares: (middlewares, devServer) => {
                        // Create a constant path value to prevent reactivity issues
                        const basePath = devServerConfig.publicPath || '/v2/'

                        // Use once-only redirect handler
                        devServer.app.get('/', (req, res) => {
                            res.redirect(301, basePath)
                        })

                        // Use a constant path for static files
                        const publicFolderURLPath = `${basePath}statics/`
                        const publicFolderPath = `${process.cwd()}/src/statics`
                        // Use webpack's built-in static serving when possible
                        if (!devServer.app._staticMiddlewareApplied) {
                            devServer.app.use(publicFolderURLPath, express.static(publicFolderPath))
                            devServer.app._staticMiddlewareApplied = true
                        }

                        return middlewares
                    }
                })
        },

        animations: 'all',

        ssr: {
            pwa: false
        },

        pwa: {
            workboxPluginMode: 'GenerateSW',
            workboxOptions: {},
            manifest: {
                name: 'NGCP Admin UI',
                short_name: 'NGCP Admin UI',
                description: 'User interface to administer the NGCP platform',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#006600',
                icons: [
                    { src: 'statics/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
                    { src: 'statics/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'statics/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
                    { src: 'statics/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
                    { src: 'statics/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
                ]
            }
        },

        cordova: {
            id: 'com.sipwise.ui.admin'
        },

        capacitor: {
            hideSplashscreen: true
        },

        electron: {
            bundler: 'packager',

            packager: {},

            builder: {
                appId: 'ngcp-admin-ui'
            },

            nodeIntegration: true,

            extendWebpack (/* cfg */) {
                // Electron main process webpack config here (if needed)
            }
        }
    }
})
