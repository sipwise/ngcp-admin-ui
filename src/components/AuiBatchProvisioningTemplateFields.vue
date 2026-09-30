<template>
    <template
        v-for="field in inputFields"
        :key="field.name"
    >
        <aui-base-form-field
            :required="isRequiredField(field)"
        >
            <q-input
                v-if="field.type === 'Text' || field.type === 'Email'"
                :type="field.type === 'Email' ? 'email' : 'text'"
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, trimIfString($event))"
            />
            <q-input
                v-else-if="field.type === 'Password' || field.type === 'PasswordConf'"
                :type="passwordVisible[field.name] ? 'text' : 'password'"
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            >
                <template #append>
                    <q-btn
                        color="primary"
                        :icon="passwordVisible[field.name] ? 'visibility' : 'visibility_off'"
                        flat
                        round
                        size="sm"
                        tabindex="-1"
                        :data-cy="`${dataCy(field)}-toggle-visibility`"
                        @click="togglePasswordVisibility(field.name)"
                    />
                </template>
            </q-input>
            <q-input
                v-else-if="field.type === 'TextArea'"
                type="textarea"
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-input
                v-else-if="['Integer', 'Float', 'Money'].includes(field.type)"
                type="number"
                :step="field.type === 'Integer' ? 1 : 'any'"
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, toNumberOrEmpty($event))"
            />
            <q-input
                v-else-if="field.type === 'IntRange'"
                type="number"
                :min="Number(field.range_start)"
                :max="Number(field.range_end)"
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="intRangeHint(field, modelValue[field.name])"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, toNumberOrEmpty($event))"
            />
            <q-select
                v-else-if="field.type === 'Select'"
                :model-value="modelValue[field.name]"
                :options="field.options || []"
                emit-value
                map-options
                clearable
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-select
                v-else-if="field.type === 'Multiple'"
                :model-value="modelValue[field.name] || []"
                :options="field.options || []"
                emit-value
                map-options
                multiple
                use-chips
                clearable
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event || [])"
            />
            <q-select
                v-else-if="field.type === 'BoolSelect'"
                :model-value="modelValue[field.name]"
                :options="boolSelectOptions(field)"
                emit-value
                map-options
                dense
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-select
                v-else-if="field.type === 'MonthName'"
                :model-value="modelValue[field.name]"
                :options="monthOptions"
                emit-value
                map-options
                clearable
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-select
                v-else-if="field.type === 'Hour'"
                :model-value="modelValue[field.name]"
                :options="hourOptions"
                emit-value
                map-options
                clearable
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-select
                v-else-if="field.type === 'Minute'"
                :model-value="modelValue[field.name]"
                :options="minuteOptions"
                emit-value
                map-options
                clearable
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-checkbox
                v-else-if="field.type === 'Checkbox'"
                :model-value="modelValue[field.name] === checkboxCheckedValue(field)"
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event ? checkboxCheckedValue(field) : '')"
            />
            <q-checkbox
                v-else-if="field.type === 'Boolean'"
                :model-value="!!modelValue[field.name]"
                dense
                :label="field.label || field.name"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, $event)"
            />
            <q-input
                v-else
                :model-value="modelValue[field.name]"
                dense
                clearable
                :label="field.label || field.name"
                :hint="field.element_attr?.title"
                :data-cy="dataCy(field)"
                :error="hasFieldError(field.name)"
                :error-message="getFieldError(field.name)"
                :disable="disable"
                @update:model-value="setField(field.name, trimIfString($event))"
            />
        </aui-base-form-field>
    </template>
</template>

<script setup>
import AuiBaseFormField from 'components/AuiBaseFormField'
import { isInputField, isRequiredField } from 'src/helpers/batch-provisioning'
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiBatchProvisioningTemplateFields' })

const props = defineProps({
    fields: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: Object,
        default: () => ({})
    },
    disable: {
        type: Boolean,
        default: false
    },
    hasFieldError: {
        type: Function,
        default: () => false
    },
    getFieldError: {
        type: Function,
        default: () => null
    }
})

const emit = defineEmits(['update:modelValue'])

const { t, locale } = useI18n()

const inputFields = computed(() => props.fields.filter(isInputField))

const passwordVisible = reactive({})

function togglePasswordVisibility (name) {
    passwordVisible[name] = !passwordVisible[name]
}

const monthOptions = computed(() => Array.from({ length: 12 }, (_, index) => ({
    label: new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(new Date(2000, index, 1)),
    value: index + 1
})))
const hourOptions = Array.from({ length: 24 }, (_, index) => ({ label: String(index), value: index }))
const minuteOptions = Array.from({ length: 60 }, (_, index) => ({ label: String(index), value: index }))

function dataCy (field) {
    return `batchprovisioningtemplates-field-${field.name}`
}

function trimIfString (value) {
    return typeof value === 'string' ? value.trim() : value
}

function toNumberOrEmpty (value) {
    return (value === null || value === '') ? '' : Number(value)
}

function intRangeHint (field, value) {
    if (!field.label_format || value === '' || value === null || value === undefined) {
        return `${field.range_start}-${field.range_end}`
    }
    return field.label_format.replace('%d', value)
}

function checkboxCheckedValue (field) {
    return field.checkbox_value ?? '1'
}

function boolSelectOptions (field) {
    return [
        { label: t('Yes'), value: field.true_value ?? '1' },
        { label: t('No'), value: field.false_value ?? '0' },
        { label: '', value: field.empty_value ?? '' }
    ]
}

function setField (name, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        [name]: value
    })
}
</script>
