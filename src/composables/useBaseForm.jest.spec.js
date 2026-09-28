/**
 * @jest-environment jsdom
 */
import { required } from '@vuelidate/validators'
import { mountComposable } from 'src/composables/composableTestHelpers'
import { useBaseForm } from 'src/composables/useBaseForm'
import { nextTick, ref } from 'vue'
import { createStore } from 'vuex'

function setup ({ initialData, validations = () => ({}), messages }) {
    const emitted = []
    const emit = (event, payload) => emitted.push([event, payload])
    const store = createStore({})
    const { result } = mountComposable(() => useBaseForm({ initialData, validations, emit, messages }), store)
    return { ...result, emitted }
}

describe('useBaseForm', () => {
    it('seeds formData from initialData', () => {
        const { formData } = setup({ initialData: () => ({ name: 'foo', description: '' }) })
        expect(formData).toEqual({ name: 'foo', description: '' })
    })

    it('hasUnsavedData reflects whether formData diverged from initialData', () => {
        const { formData, hasUnsavedData } = setup({ initialData: () => ({ name: 'foo' }) })
        expect(hasUnsavedData.value).toBe(false)
        formData.name = 'bar'
        expect(hasUnsavedData.value).toBe(true)
    })

    it('hasInvalidData reflects the validations() rules', () => {
        const { formData, hasInvalidData } = setup({
            initialData: () => ({ name: '' }),
            validations: () => ({ name: { required } })
        })
        expect(hasInvalidData.value).toBe(true)
        formData.name = 'foo'
        expect(hasInvalidData.value).toBe(false)
    })

    it('submit() emits "submit" with a snapshot of formData only when valid', () => {
        const { formData, submit, emitted } = setup({
            initialData: () => ({ name: '' }),
            validations: () => ({ name: { required } })
        })
        submit()
        expect(emitted.filter(([event]) => event === 'submit')).toHaveLength(0)

        formData.name = 'foo'
        submit()
        expect(emitted).toContainEqual(['submit', { name: 'foo' }])
    })

    it('reset() restores formData to initialData and clears dirty validation state', () => {
        const initial = ref({ name: 'foo' })
        const { formData, hasUnsavedData, reset } = setup({ initialData: () => initial.value })
        formData.name = 'bar'
        expect(hasUnsavedData.value).toBe(true)
        reset()
        expect(formData).toEqual({ name: 'foo' })
        expect(hasUnsavedData.value).toBe(false)
    })

    it('reacts to initialData changing (edit page loading a different entity)', async () => {
        const initial = ref({ name: 'foo' })
        const { formData } = setup({ initialData: () => initial.value })
        initial.value = { name: 'bar' }
        await nextTick()
        expect(formData).toEqual({ name: 'bar' })
    })

    it('getFieldError falls back to the validator\'s own $message when no messages entry matches', () => {
        const { getFieldError, submit } = setup({
            initialData: () => ({ name: '' }),
            validations: () => ({ name: { required } })
        })
        submit()
        expect(getFieldError('name')).toBe('Value is required')
    })

    it('getFieldError prefers a matching entry in `messages`', () => {
        const { getFieldError, submit } = setup({
            initialData: () => ({ name: '' }),
            validations: () => ({ name: { required } }),
            messages: { required: () => 'Input is required' }
        })
        submit()
        expect(getFieldError('name')).toBe('Input is required')
    })
})
