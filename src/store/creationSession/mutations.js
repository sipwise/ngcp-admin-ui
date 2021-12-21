
export function goToNextForm (state, { fromPath, toPath, formData }) {
    state.currentFromPath = null
    state.currentFormData = null
    state.forms.push({
        toPath: toPath,
        fromPath: fromPath,
        formData: formData
    })
}

export function goToPrevForm (state) {
    if (state.forms && state.forms.length > 0) {
        const session = state.forms.pop()
        state.currentFromPath = session.fromPath
        state.currentFormData = session.formData
    } else {
        state.currentFromPath = null
        state.currentFormData = null
    }
}

export function enterSession (state, { originPath = null }) {
    state.currentFromPath = null
    state.currentFormData = null
    state.forms = []
    state.active = true
    state.originPath = originPath
}

export function leaveSession (state) {
    state.currentFromPath = null
    state.currentFormData = null
    state.forms = []
    state.active = false
    state.originPath = null
}

export function formToForm (state, { fromPath, toPath }) {
    const lastForm = state.forms[state.forms.length - 1]
    if (lastForm && lastForm.fromPath === toPath && lastForm.toPath === fromPath) {
        const session = state.forms.pop()
        state.currentFromPath = session.fromPath
        state.currentFormData = session.formData
    }
}
