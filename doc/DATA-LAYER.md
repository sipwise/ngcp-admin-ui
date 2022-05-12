#Data Layer

##NGCP API

##Vuex Store

For state management in our application we are using: [vuex](https://vuex.vuejs.org) library.
In addition to that we are providing some helper functions to simplify typical, similar store objects creation.
For example: `generateStore` function from `src/store/storeGenerator.js`

### Store Generator

The Store Generator is an extensible module which provides a unified interface to register and call different types of store generators functions.
Different types of store generator functions provide a standard way to generate some store object. Each type uses theirs own storeGenerator configuration.

```js
function generateStore (storeConfig) // Note: a "storeGeneratorConfig" should be provided as part of the modules configurations

const storeGeneratorConfig = {
    'someGeneratorType': [generatorConfigItem, ... ],
    // ... there might be some other generator types
}

const generatorConfigItem = {
    name,
    // .... some other config props related to exact generator type
}
```

Another helper functions of Store Generator module:
```js
// function for extendit Store Generator with a new store generator type functoin
function registerStoreGeneratorType (typeName, { namesFunction, generatorFunction })

// function returns information about all generated store objects with their names
function storeGeneratorNames ({ namespace, generatorName, generatorType })

// converts a string with generator full name to format compatible with "storeGeneratorNames" function
function parseGeneratorFullName (fullName, defaultGeneratorType = '')

```

Typical StoreGenerator usage in an application:
```js
// main store file (store/index.js)
import Vue from 'vue'
import Vuex from 'vuex'
import { generateStore, registerStoreGeneratorType } from 'src/store/storeGenerator'
import { gMyTypeNames, gMyTypeGenerator } from 'src/store/sgMyType'
import SelectLazyModule from './selectLazy'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
    let storeConfig = {
        modules: {
            selectLazy: SelectLazyModule,
            // .... other modules
        }
    }

    registerStoreGeneratorTypes()
    storeConfig = generateStore(storeConfig)
    const Store = new Vuex.Store(storeConfig)

    return Store
}

function registerStoreGeneratorTypes () {
    registerStoreGeneratorType('myType', {
        namesFunction: gMyTypeNames,
        generatorFunction: gMyTypeGenerator
    })
}
```

```js
// a store module file after adding Store Generator config
// for example you can check (store/selectLazy/index.js)
// you can use it as a template for any othe such store module
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import generatorConfig from './generatorConfig'

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    generatorConfig
}
```

```js
// Example of generatorConfig file (store/selectLazy/generatorConfig.js)
export default {
    // "Store Generator Type name" with the list of configuration items for that generator
    // Note: different generators might have different configuration options
    MyType: [{
        // unique name of a Store Generator in current module
        name: 'someName1',
        // ... other config options
    }, {
        name: 'someName2',
        // ... other config options
    }]
}
```

#### Store Generator: "SelectLazy" type

`SelectLazy` generator type is used to simplifying store objects creation to work with `AuiSelectLazy` component, which requires store action to support filtering and lazy loading data from the backend by chunks (pages).
To get data from the backend this generator is using `apiGetList` API function.

```js
// general look of the "generatorConfigItem" for "SelectLazy" generator type
const generatorConfigItem = {
    name, // {string}
    accumulateData, // {boolean = true}
    apiOptions,  // {object}
    actionPayloadTransformationFn, // {function}
    defaultOptionsGetterFn, // {function} - optional
    injectOptionForEmptyList // {boolean = false}
}
```

For each item from `generatorConfig` there will be created a standard bunch of Store objects and will be added into the store module.
For config like:
```js
const storeModule = {
    namespaced: true,
    generatorConfig: {
        SelectLazy: [{
            name: 'test',
            ...
        }]
    }
}
```
We will get something like (simplified):
```js
const updatedModule = {
    namespaced: true,
    actions: {
        test ({ commit }, payload) {
            const params = actionPayloadTransformationFn(payload)
            commit('testSuccess', apiGetList(params))
        }
    },
    mutations: {
        testSuccess(data) { state.test_data = data }
    },
    getters: {
        testOptions() { return state.test_data }
    },
    state() {
        test_data: [],
        test_dataTotalCount: 0,
        test_requestParams: {}
    }
}
```
**Note:** Real names of all created objects you can get by using `function storeGeneratorNames ({ namespace, generatorName, generatorType })`

```js
// Example of generatorConfig file (/src/store/selectLazy/generatorConfig.js)

import { defaultFilterPayloadTransformation, resellerPayloadTransformation } from 'src/api/common'

// this function will transform all data which received by the action function payload
// and generated by SelectLazy component (contains filter string, pagination, extra params etc).
// The result of the function will be passed to "apiGetList" function
function actionPayloadTransformationFn (payload) {
    payload = defaultFilterPayloadTransformation(payload)
    payload = resellerPayloadTransformation(payload)
    return payload
}

// function to transform \ map element in state data
function defaultOptionsGetterFn (item) {
    return {
        label: '#' + item.id + ' - ' + item.name,
        value: item.id
    }
}

//
export default {
    // "Store Generator Type name" with the list of configuration items for that generator
    // Note: different generators might have different configuration options
    SelectLazy: [{
        // unique name of a Store Generator in current module
        name: 'emailTemplatesList',

        // means that we have to cache backend data in a certant way for some requests to backend
        // it's used to provide proper data look for AuiSelectLazy infinite scroll
        accumulateData: true,

        // base config options for "apiGetList" undelaying function
        apiOptions: {
            // ngcp API entrypoint
            resource: 'emailtemplates'
        },

        // used for: action(payload) -> transform(payload) -> apiGetList
        actionPayloadTransformationFn,

        // used for: getter -> storeData.map(defaultOptionsGetterFn)
        defaultOptionsGetterFn,

        // if true" - getter will return special "data not avaliable" item if state is empty
        injectOptionForEmptyList: true
    }, {
        // similar config for invocie templates
        name: 'invoiceTemplatesList',
        apiOptions: {
            resource: 'invoicetemplates'
        },
        actionPayloadTransformationFn,
        defaultOptionsGetterFn
    }]
}
```
