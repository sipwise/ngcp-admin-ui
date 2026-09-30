<template>
    <aui-base-edit-context>
        <template
            v-if="template"
        >
            <aui-form-actions-creation
                :loading="loading"
                :has-invalid-data="v$.$invalid"
                @submit="submit"
            />
            <aui-base-form
                layout="12"
                dense-list
            >
                <template
                    #col-1
                >
                    <aui-batch-provisioning-template-fields
                        :model-value="formData"
                        :fields="templateFields"
                        :disable="loading"
                        :has-field-error="hasFieldError"
                        :get-field-error="getFieldError"
                        @update:model-value="updateFormData"
                    />
                </template>
            </aui-base-form>
        </template>
    </aui-base-edit-context>
</template>

<script setup>
import useVuelidate from '@vuelidate/core'
import { between, email, required } from '@vuelidate/validators'
import AuiBatchProvisioningTemplateFields from 'components/AuiBatchProvisioningTemplateFields'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { useBatchProvisioningTemplateContext } from 'src/composables/useBatchProvisioningTemplateContext'
import { useBatchProvisioningTemplates } from 'src/composables/useBatchProvisioningTemplates'
import { isInputField, isRequiredField } from 'src/helpers/batch-provisioning'
import { decodeHex } from 'src/helpers/hex'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { errorMessages } from 'src/validators'
import { computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiBatchProvisioningOpenForm' })

const { t } = useI18n()
const route = useRoute()

const id = computed(() => decodeHex(route.params.id))

const { template } = useBatchProvisioningTemplateContext({
    resourceId: id,
    autoLoad: false
})
const { loading, submitOpenForm } = useBatchProvisioningTemplates()

const templateFields = computed(() => (template.value?.template?.fields || []).filter(isInputField))

const formData = reactive({})

function updateFormData (value) {
    Object.assign(formData, value)
}

function defaultFieldValue (field) {
    if (field.type === 'Multiple') {
        if (Array.isArray(field.default)) {
            return field.default
        }
        return (field.default !== undefined && field.default !== null) ? [field.default] : []
    }
    if (field.type === 'Boolean') {
        if (field.default !== undefined && field.default !== null) {
            return field.default === true || field.default === 1 || field.default === '1'
        }
        return false
    }
    if (field.default !== undefined && field.default !== null) {
        return field.default
    }

    return ''
}

watch(templateFields, (fields) => {
    fields.forEach((field) => {
        if (!(field.name in formData)) {
            formData[field.name] = defaultFieldValue(field)
        }
    })
}, { immediate: true })

const v$ = useVuelidate(computed(() => {
    const validations = {}
    templateFields.value.forEach((field) => {
        const rules = {}
        if (isRequiredField(field)) {
            rules.required = field.type === 'Boolean' ? (value) => value === true : required
        }
        if (field.type === 'Email') {
            rules.email = email
        }
        if (field.type === 'IntRange') {
            rules.between = between(Number(field.range_start), Number(field.range_end))
        }
        if (Object.keys(rules).length > 0) {
            validations[field.name] = rules
        }
    })
    return validations
}), formData)

function hasFieldError (field) {
    return !!v$.value[field] && v$.value[field].$errors.length > 0
}

function getFieldError (field) {
    const errors = v$.value[field]?.$errors
    if (!errors?.length) {
        return ''
    }
    const error = errors[0]
    return errorMessages[error.$validator] ? errorMessages[error.$validator](error.$params, error) : ''
}

function toSubmitValue (field, value) {
    if (field.type === 'Boolean') {
        return value ? '1' : '0'
    }
    return value ?? ''
}

async function submit () {
    v$.value.$touch()
    if (v$.value.$invalid) {
        return
    }
    const values = {}
    templateFields.value.forEach((field) => {
        values[field.name] = toSubmitValue(field, formData[field.name])
    })
    try {
        await submitOpenForm({
            id: id.value,
            values
        })
    } catch (error) {
        showGlobalErrorMessage(error)
        return
    }
    showGlobalSuccessMessage(t('Template submitted successfully'))
}
</script>
