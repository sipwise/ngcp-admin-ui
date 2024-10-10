/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const devServerConfig = require('./quasar.conf.dev.js')
const express = require('express')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')

module.exports = function (/* ctx */) {
    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        boot: [
            'errorHandling', // "errorHandling" should be the first boot file to begin catching errors earlier
            'appConfig',
            'i18n',
            'api',
            'auth',
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
            'fontawesome-v5',
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

        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
        supportIE: false,

        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
        supportTS: false,

        vendor: {
            remove: [
                'zxcvbn' // should be inside "pwd-sm-libs" chunk
            ]
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            env: {
                ...process.env
            },
            vueRouterMode: 'hash', // available values: 'hash', 'history'

            // rtl: false, // https://quasar.dev/options/rtl-support
            // showProgress: false,
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            // preloadChunks: false,
            // extractCSS: false,

            // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
            extendWebpack (cfg) {
                cfg.resolve.fallback = {
                    crypto: 'crypto-browserify',
                    stream: 'stream-browserify'
                }
                // removing/filtering unused Moment's locale files from final build
                cfg.plugins.push(
                    new MomentLocalesPlugin({
                        localesToKeep: ['en', 'de', 'es', 'fr', 'it']
                    })
                )
                cfg.plugins.push(
                    new ESLintPlugin({ extensions: ['js', 'vue'] })
                )
                cfg.plugins.push(
                    new webpack.ProvidePlugin({
                        process: 'process/browser'
                    })
                )
                cfg.plugins.push(
                    new webpack.DefinePlugin({
                        'process.env': JSON.stringify(process.env)
                    })
                )
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            https: false,
            port: 8081,
            open: false, // opens browser window automatically,
            devMiddleware: {
                publicPath: devServerConfig.publicPath,
                ...(!devServerConfig.proxyAPI2localhost
                    ? {}
                    : {
                        publicPath: devServerConfig.publicPath || '/v2/'
                    }
                )
            },
            ...(!devServerConfig.proxyAPI2localhost
                ? {}
                : {
                    https: true,
                    proxy: {
                        [`!${devServerConfig.publicPath || '/v2/'}`]: {
                            target: devServerConfig.proxyAPIFromURL,
                            secure: false
                        }
                    },
                    onBeforeSetupMiddleware: (devServer) => {
                        devServer.app.get('/', function (req, res) {
                            res.redirect(301, devServerConfig.publicPath || '/v2/')
                        })

                        // sharing "src/statics" folder under "v2/statics" URL in addition to default "/statics" URL
                        const publicFolderURLPath = (devServerConfig.publicPath || '/v2/') + 'statics/'
                        const publicFolderPath = 'src/statics'
                        devServer.app.use(publicFolderURLPath, express.static(publicFolderPath))
                    }
                }
            )
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: 'all',

        // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            pwa: false
        },

        // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
            workboxOptions: {}, // only for GenerateSW
            manifest: {
                name: 'NGCP Admin UI',
                short_name: 'NGCP Admin UI',
                description: 'User interface to administer the NGCP platform',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#006600',
                icons: [
                    {
                        src: 'statics/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-256x256.png',
                        sizes: '256x256',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png'
                    },
                    {
                        src: 'statics/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
            id: 'com.sipwise.ui.admin'
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            bundler: 'packager', // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'ngcp-admin-ui'
            },

            // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
            nodeIntegration: true,

            extendWebpack (/* cfg */) {
                // do something with Electron main process Webpack cfg
                // chainWebpack also available besides this extendWebpack
            }
        }
    }
}
