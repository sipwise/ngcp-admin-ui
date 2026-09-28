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
                    data-cy="batchprovisioningtemplates-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="!isReseller"
                required
            >
                <aui-select-reseller
                    v-model="formData.reseller_id"
                    class="fit"
                    dense
                    clearable
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
                    v-model="formData.lang"
                    dense
                    :options="languageOptions"
                    emit-value
                    map-options
                    :label="t('Language')"
                    data-cy="batchprovisioningtemplates-lang"
                    :error="hasFieldError('lang')"
                    :error-message="getFieldError('lang')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.description"
                    clearable
                    dense
                    type="textarea"
                    :label="t('Description')"
                    data-cy="batchprovisioningtemplates-description"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <aui-yaml-editor
                    v-model="formData.template"
                    :label="t('Template')"
                    data-cy="batchprovisioningtemplates-template"
                    :error="hasFieldError('template')"
                    :error-message="getFieldError('template')"
                    :disable="loading"
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
import AuiYamlEditor from 'components/input/AuiYamlEditor'
import { useBaseForm } from 'src/composables/useBaseForm'
import { useUser } from 'src/composables/useUser'
import { dumpTemplateYaml } from 'src/helpers/batch-provisioning'
import { errorMessages } from 'src/validators'
import { isValidTemplateName, isValidYamlMapping } from 'src/validators/common'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AuiNewBatchProvisioningTemplate' })

const DEFAULT_TEMPLATE_SNIPPETS = {
    js: {
        sip_username: 'function() { return row.cc.concat(row.ac).concat(row.sn); }',
        firstname: 'function() { return row.first_name; }',
        lastname: 'function() { return row.last_name; }',
        contact_id: 'function() { return contract_contact.id; }',
        cc: 'function() { return row.cc; }',
        ac: 'function() { return row.ac; }',
        sn: 'function() { return row.sn; }',
        username: 'function() { return row.sip_username; }',
        password: 'function() { return row.sip_password; }',
        gpp0: 'provisioning templates test'
    },
    perl: {
        sip_username: 'sub { return $row{cc}.$row{ac}.$row{sn}; }',
        firstname: 'sub { return $row{first_name}; }',
        lastname: 'sub { return $row{last_name}; }',
        contact_id: 'sub { return $contract_contact{id}; }',
        cc: 'sub { return $row{cc}; }',
        ac: 'sub { return $row{ac}; }',
        sn: 'sub { return $row{sn}; }',
        username: 'sub { return $row{sip_username}; }',
        password: 'sub { return $row{sip_password}; }',
        gpp0: 'test'
    }
}

function getDefaultTemplate (lang) {
    const snippets = DEFAULT_TEMPLATE_SNIPPETS[lang] ?? DEFAULT_TEMPLATE_SNIPPETS.js
    return `fields:
  - name: first_name
    label: "First Name:"
    type: Text
    required: 1
  - name: last_name
    label: "Last Name:"
    type: Text
    required: 1
  - name: cc
    label: "Country Code:"
    type: Text
    required: 1
  - name: ac
    label: "Area Code:"
    type: Text
    required: 1
  - name: sn
    label: "Subscriber Number:"
    type: Text
    required: 1
  - name: sip_username
    type: calculated
    value_code: "${snippets.sip_username}"
  - name: purge
    label: "Terminate subscriber, if exists:"
    type: Boolean
contract_contact:
  identifier: "firstname, lastname, status"
  reseller: default
  firstname_code: "${snippets.firstname}"
  lastname_code: "${snippets.lastname}"
  status: "active"
contract:
  product: "Basic SIP Account"
  billing_profile: "Default Billing Profile"
  identifier: contact_id
  contact_id_code: "${snippets.contact_id}"
subscriber:
  domain: "example.org"
  primary_number:
    cc_code: "${snippets.cc}"
    ac_code: "${snippets.ac}"
    sn_code: "${snippets.sn}"
  username_code: "${snippets.username}"
  password_code: "${snippets.password}"
subscriber_preferences:
  gpp0: "${snippets.gpp0}"
`
}

const DEFAULT_TEMPLATE_JS = getDefaultTemplate('js')

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
    },
    resellerName: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['has-unsaved-data', 'has-invalid-data', 'submit'])

const { t } = useI18n()

const { isReseller } = useUser()

const languageOptions = [
    { label: 'JavaScript', value: 'js' },
    { label: 'Perl', value: 'perl' }
]

const initialData = computed(() => {
    if (props.initialFormData) {
        const template = props.initialFormData.template
        return {
            name: props.initialFormData.name,
            reseller_id: props.initialFormData.reseller_id,
            description: props.initialFormData.description,
            lang: props.initialFormData.lang,
            // If the API returns no template, the editor starts empty.
            // Saving is then blocked, so the stored template is never overwritten with "{}".
            template: template && typeof template === 'object' ? dumpTemplateYaml(template) : (template ?? '')
        }
    }
    return {
        name: '',
        reseller_id: null,
        description: '',
        lang: 'js',
        template: DEFAULT_TEMPLATE_JS
    }
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
        name: {
            required,
            isValidTemplateName: (value) =>
                (props.initialFormData && value === initialData.value.name) || isValidTemplateName(value)
        },
        reseller_id: isReseller.value ? {} : { required },
        lang: { required },
        description: {
            required: (value) =>
                (props.initialFormData && value === initialData.value.description) || required.$validator(value)
        },
        template: {
            required,
            isValidYamlMapping: (value) =>
                (props.initialFormData && value === initialData.value.template) || isValidYamlMapping(value)
        }
    }),
    emit,
    messages: errorMessages
})

watch(() => formData.lang, (newLang, oldLang) => {
    if (props.initialFormData || oldLang === undefined) {
        return
    }
    if (formData.template === getDefaultTemplate(oldLang)) {
        formData.template = getDefaultTemplate(newLang)
    }
})

const initialResellerOption = computed(() => {
    if (props.resellerId && props.resellerName) {
        return {
            label: props.resellerName,
            value: props.resellerId
        }
    }
    return null
})
</script>
