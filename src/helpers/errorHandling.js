import { showGlobalErrorMessage } from 'src/helpers/ui'
import { i18n } from 'boot/i18n'

export function registerGlobalErrorHooks (Vue) {
    // INFO: a lot of interesting cases about error handling you could find in this article:
    //       https://catchjs.com/Docs/AsyncAwait

    // NOTE: it's used for catching exceptions from not the main execution context, like a "setTimeout" handler.
    // Code example which will generate an exception for this handler:
    //     setTimeout(() => throw new Error('Exception from setTimeout'), 300)
    checkHandler(window.onerror, 'window.onerror')
    window.onerror = function (msg, src, linenum, colnum, error) {
        const exception = error || msg
        processError(exception, {
            outputErrorAsObject: false,
            outputErrorInConsole: false
        })
    }

    // NOTE: it's used for catching exceptions from Promises context, also take a look on store decorator function below
    // To display an exception from this handler you could block network request(s) on your browser's Network tab
    checkHandler(window.onunhandledrejection, 'window.onunhandledrejection')
    window.onunhandledrejection = function (promiseRejectionEvent) {
        const exception = promiseRejectionEvent?.reason
        processError(exception, {
            outputErrorAsObject: true,
            outputErrorInConsole: false
        })
    }

    // NOTE: it's used for catching exceptions from Vue components context
    // Code example which will generate an exception for this handler, add it into a Vue component code:
    //     mounted () {
    //         throw new Error('Exception from Vue component')
    //     }
    checkHandler(Vue?.config?.errorHandler, 'Vue.config.errorHandler')
    Vue.config.errorHandler = function (error, vm, info) {
        const componentName = vm?.$options?.name
        const componentFile = vm?.$options?.__file
        if (componentName || componentFile) {
            error.__exceptionOrigin = `Exception from component: ${componentName}`
            error.__exceptionOrigin += componentFile ? ' (' + componentFile + ')' : ''
            error.__exceptionOrigin += info ? '; ' + info : ''
        }
        processError(error, {
            outputErrorAsObject: false,
            outputErrorInConsole: true
        })
    }
}

function checkHandler (handler, name) {
    if (handler !== undefined && handler !== null) {
        console.dir(handler)
        throw new Error(`It doesn't expected to see another assigned handler for "${name}"`)
    }
}

// NOTE: for most cases "window.onunhandledrejection" should catch any not processed exceptions from promises,
//       but some browsers does not have "window.onunhandledrejection", that is why we are still need this decorator
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
                                    if (typeof error === 'object') {
                                        error.__exceptionOrigin = `Exception from store action: "${moduleName}/${actionName}"`
                                    }
                                    setTimeout(() => {
                                        processError(error)
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

export function markErrorAsHandled (error) {
    if (typeof error === 'object') error.__handled = true
}

export function isErrorNotHandled (error) {
    return typeof error !== 'object' || (typeof error === 'object' && !error.__handled)
}

function processError (error, options = {
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
            const unhandledErrorPrefix = i18n.t('Unexpected error') + ' ' + unhandledErrorChar + ': '
            if (error.message) {
                error.message = unhandledErrorPrefix + error.message
            }
        }
        showGlobalErrorMessage(error)
        markErrorAsHandled(error)
    }
}
