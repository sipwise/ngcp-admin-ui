const esModules = ['quasar/lang', 'lodash-es', 'quasar'].join('|')

module.exports = {
    globals: {
        __DEV__: true,
        // TODO: Remove if resolved natively https://github.com/vuejs/vue-jest/issues/175
        'vue-jest': {
            pug: { doctype: 'html' }
        }
    },
    setupFilesAfterEnv: ['<rootDir>/t/jest/jest.setup.js'],
    // noStackTrace: true,
    // bail: true,
    // cache: false,
    // verbose: true,
    // watch: true,
    collectCoverage: false,
    coverageDirectory: '<rootDir>/t/jest/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.vue',
        '<rootDir>/src/**/*.js',
        '<rootDir>/src/**/*.jsx'
    ],
    // Needed in JS codebases too because of feature flags
    coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$'],
    coverageThreshold: {
        global: {
            //  branches: 50,
            //  functions: 50,
            //  lines: 50,
            //  statements: 50
        }
    },
    testMatch: [
        '<rootDir>/t/jest/__tests__/**/*.(spec|test).js',
        '<rootDir>/src/**/*.jest.(spec|test).js'
    ],
    moduleFileExtensions: ['vue', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '^vue$': '<rootDir>/node_modules/vue/dist/vue.cjs.js',
        '^test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
        '^quasar$': '<rootDir>/node_modules/quasar/dist/quasar.server.prod.cjs',
        '^~/(.*)$': '<rootDir>/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^t/(.*)$': '<rootDir>/t/$1',
        // Quasar CLI's own default webpack aliases for the app's build - not
        // covered by the `src/` mapping above since components/pages/etc. are
        // imported bare (e.g. `from 'components/...'`) throughout the app.
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^boot/(.*)$': '<rootDir>/src/boot/$1',
        '.*css$': '@quasar/quasar-app-extension-testing-unit-jest/stub.css'
    },
    transform: {
        '.*\\.vue$': '<rootDir>/node_modules/@vue/vue3-jest',
        '.*\\.js$': '<rootDir>/node_modules/babel-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
    // use these if NPM is being flaky, care as hosting could interfere with these
    // '.*\\.vue$': '@quasar/quasar-app-extension-testing-unit-jest/node_modules/vue-jest',
    // '.*\\.js$': '@quasar/quasar-app-extension-testing-unit-jest/node_modules/babel-jest'
    },
    transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
    snapshotSerializers: ['jest-serializer-vue'],
    reporters: ['default', 'jest-junit']
}
