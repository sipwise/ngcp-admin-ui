<template>
    <aui-base-form
        layout="12"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :label="t('Name')"
                    data-cy="invoicetemplate-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="showResellerSelect"
                required
            >
                <aui-select-reseller
                    v-model="formData.reseller_id"
                    class="fit"
                    dense
                    :initial-option="initialResellerOption"
                    :error="hasFieldError('reseller_id')"
                    :error-message="getFieldError('reseller_id')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.type"
                    dense
                    emit-value
                    map-options
                    :options="typeOptions"
                    :label="t('Type')"
                    data-cy="invoicetemplate-type"
                    :error="hasFieldError('type')"
                    :error-message="getFieldError('type')"
                    :disable="loading || isEdit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.call_direction"
                    dense
                    emit-value
                    map-options
                    :options="callDirectionOptions"
                    :label="t('Call Direction')"
                    data-cy="invoicetemplate-call-direction"
                    :error="hasFieldError('call_direction')"
                    :error-message="getFieldError('call_direction')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.category"
                    dense
                    emit-value
                    map-options
                    :options="categoryOptions"
                    :label="t('Category')"
                    data-cy="invoicetemplate-category"
                    :error="hasFieldError('category')"
                    :error-message="getFieldError('category')"
                    :disable="loading || isEdit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script setup>
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import { useBaseForm } from 'src/composables/useBaseForm'
import { useUser } from 'src/composables/useUser'
import {
    getInvoiceTemplateCallDirectionOptions,
    getInvoiceTemplateCategoryOptions,
    isResellerRequired,
    toInvoiceTemplateFormData
} from 'src/helpers/invoice-templates'
import { errorMessages } from 'src/validators'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiNewInvoiceTemplate' })

const props = defineProps({
    initialFormData: {
        type: Object,
        default: undefined
    },
    loading: {
        type: Boolean,
        default: false
    },
    resellerId: {
        type: Number,
        default: null
    }
})

const emit = defineEmits(['has-unsaved-data', 'has-invalid-data', 'submit'])

const { t } = useI18n()
const { isReseller } = useUser()

const isEdit = computed(() => !!props.initialFormData)

const showResellerSelect = computed(() =>
    isResellerRequired(formData.category) &&
    !isReseller.value &&
    props.resellerId === null
)

const typeOptions = computed(() => [
    { value: 'svg', label: t('SVG') }
])

const callDirectionOptions = computed(() => getInvoiceTemplateCallDirectionOptions())

const categoryOptions = computed(() => getInvoiceTemplateCategoryOptions())

const initialData = computed(() => {
    if (props.initialFormData) {
        return toInvoiceTemplateFormData(props.initialFormData)
    }
    return {
        name: '',
        reseller_id: props.resellerId,
        type: 'svg',
        call_direction: 'out',
        category: 'customer'
    }
})

const initialResellerOption = computed(() => {
    const reseller = props.initialFormData?.reseller_id_expand
    return reseller
        ? { label: reseller.name, value: props.initialFormData.reseller_id }
        : null
})

const {
    formData,
    hasUnsavedData,
    hasInvalidData,
    hasFieldError,
    getFieldError,
    reset,
    submit
} = useBaseForm({
    initialData,
    validations: () => ({
        name: { required },
        reseller_id: {
            required: (value, form) => !isResellerRequired(form.category) ||
                isReseller.value ||
                props.resellerId !== null ||
                !!value
        },
        type: { required },
        call_direction: { required },
        category: { required }
    }),
    emit,
    messages: errorMessages
})
</script>
