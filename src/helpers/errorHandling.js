import { showGlobalErrorMessage } from 'src/helpers/ui'
import { i18n } from 'boot/i18n'

export function registerGlobalErrorHooks (app) {
    // INFO: a lot of interesting cases about error handling you could find in this article:
    //       https://catchjs.com/Docs/AsyncAwait

    // NOTE: it's used for catching exceptions from not the main execution context, like a "setTimeout" handler.
    // EXAMPLE: next code will generate an exception for this handler:
    //     setTimeout(() => throw new Error('Exception from setTimeout'), 300)

    /* Note: to not conflict with some testing software (like Cypress.io or Mocha) we will attach "error"
             event listener instead of using just "window.onerror =". I's not supported by old browsers like IE. */
    // window.onerror = onGlobalError   // uncomment it if you need to support old browsers
    function onGlobalError (msg, src, linenum, colnum, error) {
        const exception = error || msg
        processError(exception, {
            outputErrorAsObject: false,
            outputErrorInConsole: false
        })
    }
    window.addEventListener('error', function (e) {
        const { message, filename, lineno, colno, error } = e
        onGlobalError(message, filename, lineno, colno, error)
    })

    // NOTE: it's used for catching exceptions from Promises context, also take a look on store decorator function below
    // EXAMPLE: To display an exception from this handler you could block network request(s) on your browser's Network tab

    /* Note: to not conflict with some testing software (like Cypress.io or Mocha) we will attach "unhandledrejection"
             event listener instead of using just "window.onunhandledrejection =". I's not supported by old browsers like IE. */
    // window.onunhandledrejection = onGlobalPromiseRejection   // uncomment it if you need to support old browsers
    function onGlobalPromiseRejection (promiseRejectionEvent) {
        const exception = promiseRejectionEvent?.reason || promiseRejectionEvent?.error
        processError(exception, {
            outputErrorAsObject: true,
            outputErrorInConsole: false
        })
    }
    window.addEventListener('unhandledrejection', onGlobalPromiseRejection)

    // NOTE: it's used for catching exceptions from Vue components context
    // EXAMPLE: next code will generate an exception for this handler, add it into a Vue component code:
    //     mounted () {
    //         throw new Error('Exception from Vue component')
    //     }
    if (app?.config?.errorHandler) {
        const oldVueErrorHandler = app.config.errorHandler
        app.config.errorHandler = function severalVueErrorHandlers (...params) {
            const result = oldVueErrorHandler.apply(this, arguments)
            vueGlobalErrorHandler(...params)
            return result
        }
    } else {
        app.config.errorHandler = vueGlobalErrorHandler
    }
    function vueGlobalErrorHandler (error, vm, info) {
        let errorObj = error
        if (typeof errorObj !== 'object') {
            errorObj = {
                message: error || info
            }
        }
        const componentName = vm?.$options?.name
        const componentFile = vm?.$options?.__file
        if (componentName || componentFile) {
            errorObj.__exceptionOrigin = `Exception from component: ${componentName}`
            errorObj.__exceptionOrigin += componentFile ? ' (' + componentFile + ')' : ''
            errorObj.__exceptionOrigin += info ? '; ' + info : ''
        }
        processError(errorObj, {
            outputErrorAsObject: false,
            outputErrorInConsole: true
        })
    }
}

// NOTE: for most cases "window.onunhandledrejection" (or "unhandledrejection" event) should catch any not processed
//       exceptions from promises, but some browsers does not have "window.onunhandledrejection", that is why we are
//       still need this decorator.
//       Also it might be useful to add some additional info to the exception details.
// NOTE: We are decorating only "actions" because only action function usually asynchronous and returning Promises
const decorateStore = true
export function storeExceptionsDecorator (storeOptions) {
    if (decorateStore) {
        const modules = storeOptions.modules
        if (modules) {
            Object.entries(modules).forEach(([moduleName, moduleInstance]) => {
                if (moduleInstance.actions) {
                    const actions = { ...moduleInstance.actions }
                    Object.keys(actions).forEach(actionName => {
                        if (typeof actions[actionName] === 'function') {
                            const originalAction = actions[actionName]
                            actions[actionName] = async function actionExceptionsDecorator (...args) {
                                try {
                                    return await originalAction.apply(this, arguments)
                                } catch (error) {
                                    // schedule to show an error. And show it if it doesn't processed and marked as
                                    // handled somewhere in upper context
                                    // IMPORTANT: In most cases if user see an exception from here it means that
                                    //   this exact async\await calls stack has an error (missed "await" or ".catch()")
                                    //   and it should be fixed in code.
                                    let errorObj = error
                                    if (typeof errorObj !== 'object') {
                                        errorObj = {
                                            message: error
                                        }
                                    }
                                    errorObj.__exceptionOrigin = `Exception from store action: "${moduleName}/${actionName}"`
                                    setTimeout(() => {
                                        processError(errorObj)
                                    }, 200)

                                    throw error
                                }
                            }
                        }
                    })
                    moduleInstance.actions = actions
                }
            })
        }
    }
    return storeOptions
}

export function markErrorAsHandled (error, handledAsType = 'global') {
    if (typeof error === 'object') {
        error.__handled = true
        error.__handledAsType = handledAsType
    }
}

export function isErrorNotHandled (error, handledAsType) {
    const handledAsTypeArr = Array.isArray(handledAsType) ? handledAsType : [handledAsType]
    const handledAsTypeArrFiltered = handledAsTypeArr.filter(item => !!item)
    const handledAsTypeSet = new Set(handledAsTypeArrFiltered)

    return typeof error !== 'object' ||
        (typeof error === 'object' && !error.__handled) ||
        (typeof error === 'object' && handledAsTypeSet?.size && !handledAsTypeSet.has(error.__handledAsType))
}

const errorInterceptors = []
export function addErrorInterceptor (fn) {
    if (typeof fn === 'function') {
        errorInterceptors.push(fn)
    }
}

function processError (error, options = {
    outputErrorAsObject: true,
    outputErrorInConsole: true
}) {
    if (isErrorNotHandled(error)) {
        try {
            errorInterceptors.forEach(eif => {
                try {
                    if (typeof eif === 'function') {
                        eif(error, options)
                    }
                } catch (e) {
                    baseProcessError(e)
                }
            })
        } finally {
            baseProcessError(error, options)
        }
    }
}

function baseProcessError (error, options = {
    outputErrorAsObject: true,
    outputErrorInConsole: true
}) {
    if (isErrorNotHandled(error)) {
        if (typeof error === 'object' && error.__exceptionOrigin) {
            console.info('%c' + error.__exceptionOrigin, 'background: #aedef9; color: black')
        }
        if (options?.outputErrorAsObject) {
            // outputting error as an object to help a developer to check exception internal properties,
            // useful for Promises
            console.dir(error)
        }
        if (options?.outputErrorInConsole) {
            // outputting error to the console for better debugging or screenshot making experience,
            // useful for cases where browser doesn't do it automatically, like for Vue components
            console.error(error)
        }

        if (typeof error === 'object') {
            const unhandledErrorChar = '😱'
            const unhandledErrorPrefix = i18n.global.tc('Unexpected error') + ' ' + unhandledErrorChar + ': '
            if (error.message) {
                error.message = unhandledErrorPrefix + error.message
            }
        }
        // Silence the ResizeObserver error
        if (typeof error === 'string' && error.includes('ResizeObserver loop completed with undelivered notifications')) {
            return
        }
        showGlobalErrorMessage(error)
        markErrorAsHandled(error, 'last-chance notification')
    }
}
