# Data Layer

## Table of Contents
- [NGCP API](#ngcp-api)
- [aui-data-table Component](#aui-data-table-component)
- [API Error Handling](#api-error-handling)
- [Component-level Error Handling](#component-level-error-handling)
- [Vuex Store and Store Generators](#vuex-store-and-store-generators)

## NGCP API

The application uses a centralized API module `src/api/ngcpAPI.js` that provides standardized functions for interacting with the NGCP backend:

- `apiGet(resource, id)` - Fetch single resource
- `apiGetList(params)` - Low-level function to fetch paginated lists
- `apiGetPaginatedList(options, pagination)` - High-level function for tables with sorting and filtering
- `apiPost(resource, data)` - Create new resource
- `apiPatch(resource, id, data)` - Update existing resource
- `apiDelete(resource, id)` - Delete resource
- `apiFetchEntity(resource, id)` - Convenience method for retrieving single entities
- `apiCreateCancelObject()` - For creating cancellable requests
- `apiIsCanceledRequest(exception)` - For checking if a request was canceled

### API Function Selection Guide

When working with tables and lists, use:
- `apiGetPaginatedList` - For table components that need pagination, sorting and filtering
- `apiGetList` - For simpler list retrieval without complex pagination requirements

The `apiGetPaginatedList` function builds on top of `apiGetList` and adds:
- Advanced sorting (`order_by`, `order_by_direction`)
- Support for object and string filtering
- Wildcard support for text searches
- Special handling for different API versions
- "All rows" request handling

**Note:** Some data retrieval still uses the outdated `ngcpPanelAPI`. Please do not use methods in that file as we are working to deprecate them.

## aui-data-table Component

The `aui-data-table` component provides a comprehensive data grid solution with built-in support for server-side pagination, filtering, sorting, and CRUD operations.

### Component Structure and Mixins

This is a [Vue2 Concept](https://v2.vuejs.org/v2/guide/mixins), ideally we will migrate to Vue3 soon.
The `aui-data-table` component works best with two key mixins:

```js
// Import mixins in your component
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'

export default {
    // Use the mixins
    mixins: [
        dataTable,
        dataTableColumn
    ],
    // ...
}
```

These mixins provide:
- `dataTable`: Core data loading functionality, pagination, and CRUD operations
- `dataTableColumn`: Helpers for column configuration and formatting

### Declarative Configuration

The component can be configured declaratively through props:

```js
// Example from AuiSubscriberList.vue
<aui-data-table
    ref="dataTable"
    :title="$t('Subscribers')"
    table-id="subscribers"
    resource="subscribers"
    resource-type="api"
    resource-search-field="username"
    :resource-search-wildcard="true"
    :resource-singular="$t('Subscriber')"
    :columns="columns"
    :deletable="true"
    :editable="true"
    :searchable="true"
    :row-actions="rowActions"
    :search-criteria-config="searchCriteriaConfig"
/>
```

### Core Properties

- `table-id`: Identifier for the table
- `resource`: API resource to fetch data from
- `resource-type`: Type of resource (usually "api")
- `resource-search-field`: Default field for quick search
- `resource-search-wildcard`: Enable wildcard searching
- `resource-singular`: Singular form of the resource name for labels
- `columns`: Column configuration array
- `deletable`: Enable delete functionality
- `editable`: Enable inline editing
- `searchable`: Enable search functionality
- `row-actions`: Custom actions for rows
- `search-criteria-config`: Advanced search configuration

### Data Retrieval: Server-Side Processing

Under the hood, the component uses `apiGetPaginatedList` for fetching data with:
- Initial load on mount
- Pagination handling
- Sorting by columns
- Filtering with simple and advanced search

### Store Integration

While the component can work with direct API calls, it's commonly integrated with the SelectLazy store generator:

```js
// Store module configuration for table data
export default {
    namespaced: true,
    generatorConfig: {
        SelectLazy: [{
            name: 'subscribersList',
            accumulateData: false, // Usually false for table data
            apiOptions: {
                resource: 'subscribers'
            },
            actionPayloadTransformationFn: tablePayloadTransformation
        }]
    }
}
```

In components, use Vuex's `mapActions` and `mapState`:

```js
// As seen in real components
import { mapActions, mapState } from 'vuex'

export default {
    // ...
    computed: {
        ...mapState('subscribers', [
            'is2FaEnabled'
        ]),
    },
    methods: {
        ...mapActions('subscribers', [
            'resetSubscriberOtp',
            'getSubscriber2FAPreferences'
        ]),
        // Custom component methods
    }
}
```

## API Error Handling

Error handling is standardized across the application using the API layer's built-in mechanisms:

### Global Error Interceptors

At the core level, all API errors are handled through axios interceptors:

- Request Interceptors: Catch errors before requests are sent
- Error Normalization: The handleRequestError function from `src/api/common` standardizes error formats
- Authentication Handling: Special logic detects 401 errors and triggers automatic logout

The interceptor system is set up once when the API module initializes:

```js
const interceptorRejection = getInterceptorRejectionFunction(logoutFunc, getLogoutMessage)
httpApi.interceptors.request.use(authTokenInterceptor, interceptorRejection)
```

### 2. Consistent Error Catching in API Methods
Each API method in `ngcpAPI.js` follows the same pattern, ensuring errors are always handled:

```js
export async function apiGet(options) {
    // ...API call implementation...
    return httpApi.get(path, options.config).catch(handleRequestError)
}
```

### Request Cancellation Support

The API module provides tools to prevent errors from canceled requests (e.g., when navigating away):

- `apiCreateCancelObject()` creates a cancellation token
- `apiIsCanceledRequest()` helps identify canceled request errors
- Components can safely cancel in-flight requests during unmount

### Component-level Error Handling

When working with API methods in components, use these standard error handling patterns:
- `showGlobalErrorMessage()` displays consistent error notifications
- `showGlobalSuccessMessage()` shows success messages
- Components maintain loading/error states for good UX

The application provides error handling helpers in `src/helpers/ui`:

```js
// Component method using helper functions
async doSomethingHandles() {
  try {
    await this.doSomething(...)

    // Show success notification
    showGlobalSuccessMessage(this.$t('Subscriber updated successfully'))

  } catch (error) {
    // Show error notification with details from the API
    showGlobalErrorMessage(this.$t('Failed to update subscriber'), error)
  }
}
```

This multi-layered approach ensures errors are handled consistently throughout the application, providing a good user experience even when things go wrong.

## Vuex Store and Store Generators

For state management in our application we use [vuex](https://vuex.vuejs.org) along with custom store generators to simplify common patterns.

### Store Generator Configuration

Store generators reduce boilerplate by creating standard store objects based on configuration:

```js
export default {
    namespaced: true,
    generatorConfig: {
        // "Store Generator Type" with configuration items
        // Different generators have different configuration options
        SelectLazy: [{
            // unique name of a Store Generator in current module
            name: 'someName1',
            // ... other config options
        }, {
            name: 'someName2',
            // ... other config options
        }]
    }
}
```

### Store Generator: "SelectLazy" type

`SelectLazy` generator type simplifies store objects creation to work with `AuiSelectLazy` component, which requires store action to support filtering and lazy loading data.

```js
// General structure of a "SelectLazy" generator configuration
const generatorConfigItem = {
    name, // {string} - unique name within module
    accumulateData, // {boolean = true} - whether to accumulate data across requests
    apiOptions,  // {object} - passed to apiGetList
    actionPayloadTransformationFn, // {function} - transforms action payload
    defaultOptionsGetterFn, // {function} - optional, transforms items for display
    injectOptionForEmptyList // {boolean = false} - adds placeholder for empty lists
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
        testSuccess(state, data) { state.test_data = data }
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

### Payload Transformation

The `actionPayloadTransformationFn` transforms UI parameters to API parameters. You can configure it in generatorConfig.
Receives the raw payload from the UI action and must return the final options/payload passed to the API call (the object the generator will pass to apiGetList / apiGetPaginatedList). Typically calls `defaultFilterPayloadTransformation` to get the base params, then augments or remaps them for the specific resource (add `order_by`/`order_by_direction`, include extra filters, change param names, add resource or apiOptions, etc.).

Example of how they work together:

1. Component dispatches store action with UI payload (filters, pagination, sorting).
2. Store generator calls `actionPayloadTransformationFn(payload)`.
3. `actionPayloadTransformationFn` usually calls `defaultFilterPayloadTransformation(payload)` then adds resource-specific fields and returns final options.
4. Generator calls `apiGetList` / `apiGetPaginatedList` with that returned options.

```js
// generic helper (provided by repo)
function defaultFilterPayloadTransformation(payload) {
  return {
    params: {
      page: payload.pagination?.page || 1,
      rows: payload.pagination?.rowsPerPage || 10,
    },
    filter: payload.filter || ''
  }
}

// per-store item transform (configured as actionPayloadTransformationFn)
function tablePayloadTransformation(payload) {
  const base = defaultFilterPayloadTransformation(payload)

  // add table-specific sorting mapping
  if (payload.sorting) {
    base.params.order_by = payload.sorting.sortBy
    base.params.order_by_direction = payload.sorting.descending ? 'desc' : 'asc'
  }

  // add resource-specific fixed options
  return Object.assign({}, base, {
    resource: 'subscribers',
    resourceSearchField: ['username', 'email']
  })
}
```

### Example Store Configuration

```js
// Example store module with SelectLazy generator
export default {
    // "Store Generator Type name" with the list of configuration items for that generator
    // Note: different generators might have different configuration options
    namespaced: true,
    generatorConfig: {
        SelectLazy: [{
            // unique name of a Store Generator in current module
            name: 'emailTemplatesList',
            // means that we have to cache backend data in a certain way for some requests to backend
            // it's used to provide proper data look for AuiSelectLazy infinite scroll
            accumulateData: true,
            // base config options for "apiGetList" underlying function
            apiOptions: {
                // ngcp API entrypoint
                resource: 'emailtemplates'
            },
            // used for: action(payload) -> transform(payload) -> apiGetList
            actionPayloadTransformationFn,
            // used for: getter -> storeData.map(defaultOptionsGetterFn)
            // if true" - getter will return special "data not available" item if state is empty
            defaultOptionsGetterFn: (item) => ({
                label: '#' + item.id + ' - ' + item.name,
                value: item.id
            }),
            injectOptionForEmptyList: true
        }]
    }
}
```