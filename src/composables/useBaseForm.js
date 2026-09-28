import useVuelidate from '@vuelidate/core'
import {
    computed,
    reactive,
    toRaw,
    toValue,
    watch
} from 'vue'

export function useBaseForm ({ initialData, validations, emit, messages = {} }) {
    const formData = reactive(structuredClone(toRaw(toValue(initialData)) ?? {}))

    function applyData (data) {
        Object.keys(formData).forEach((key) => delete formData[key])
        Object.assign(formData, structuredClone(toRaw(data) ?? {}))
    }

    watch(() => toValue(initialData), (data) => applyData(data), { deep: true })

    const v$ = useVuelidate(computed(() => ({ formData: validations() })), { formData })

    const hasUnsavedData = computed(() => JSON.stringify(toValue(initialData) ?? {}) !== JSON.stringify(formData))
    const hasInvalidData = computed(() => v$.value.$invalid)

    watch(hasUnsavedData, (value) => emit('has-unsaved-data', value))
    watch(hasInvalidData, (value) => emit('has-invalid-data', value))

    function hasFieldError (field) {
        return !!v$.value.formData[field] && v$.value.formData[field].$errors.length > 0
    }

    function getFieldError (field) {
        const errors = v$.value.formData[field]?.$errors
        if (!errors || !errors.length) {
            return ''
        }
        const error = errors[0]
        const messageFn = messages[error.$validator]
        if (messageFn) {
            return messageFn(error.$params, error)
        }
        return typeof error.$message === 'function' ? error.$message() : error.$message
    }

    function reset () {
        applyData(toValue(initialData))
        v$.value.$reset()
    }

    function submit () {
        v$.value.$touch()
        if (!hasInvalidData.value) {
            emit('submit', structuredClone(toRaw(formData)))
        }
    }

    return {
        formData,
        v$,
        hasUnsavedData,
        hasInvalidData,
        hasFieldError,
        getFieldError,
        reset,
        submit
    }
}
