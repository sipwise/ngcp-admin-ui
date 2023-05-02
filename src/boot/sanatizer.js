
function toBoolean (value) {
    const isTrue = ['true', 'yes', '1', 1, true]
    const isFalse = ['false', 'no', '0', 0, false]
    if (isTrue.indexOf(value) > -1) {
        return true
    } else if (isFalse.indexOf(value) > -1) {
        return false
    } else {
        return undefined
    }
}

function toVerbalBoolean (value) {
    if (value === true) {
        return 'yes'
    } else if (value === false) {
        return 'no'
    } else {
        return undefined
    }
}

export default ({ app, router, Vue, store }) => {
    app.config.globalProperties.$toBoolean = toBoolean
    app.config.globalProperties.$toVerbalBoolean = toVerbalBoolean
    store.$toBoolean = toBoolean
    store.$toVerbalBoolean = toVerbalBoolean
}
