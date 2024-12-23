<template>
    <aui-base-form
        :layout="$attrs.layout || '6-6'"
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
                <aui-select-reseller
                    v-model="formData.reseller_id"
                    class="fit"
                    dense
                    :initial-option="initialResellerOption"
                    :error="hasFieldError('reseller_id')"
                    :error-message="getFieldError('reseller_id')"
                    :disable="loading"
                >
                    <template
                        #after
                    >
                        <aui-create-reseller-button
                            :form-data="formData"
                        />
                    </template>
                </aui-select-reseller>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="emailtemplates-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.subject"
                    clearable
                    dense
                    :label="$t('Subject')"
                    data-cy="emailtemplates-subject"
                    :error="hasFieldError('subject')"
                    :error-message="getFieldError('subject')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.fromEmail"
                    clearable
                    dense
                    :label="$t('From Email')"
                    data-cy="emailtemplates-from-email"
                    :error="hasFieldError('fromEmail')"
                    :error-message="getFieldError('fromEmail')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.body"
                    clearable
                    dense
                    type="textarea"
                    :label="$t('Body')"
                    data-cy="emailtemplates-body"
                    :error="hasFieldError('body')"
                    :error-message="getFieldError('body')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.attachment_name"
                    clearable
                    dense
                    :label="$t('Attachment name')"
                    data-cy="emailtemplates-attachment-name"
                    :error="hasFieldError('attachment_name')"
                    :error-message="getFieldError('attachment_name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'

export default {
    name: 'AuiNewEmailTemplate',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectReseller,
        AuiCreateResellerButton
    },
    mixins: [baseFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        fromEmail: {
            type: String,
            default: null
        },
        subject: {
            type: String,
            default: null
        },
        body: {
            type: String,
            default: null
        },
        attachment: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                },
                subject: {
                    required
                },
                fromEmail: {
                    email,
                    required
                },
                body: {
                    required
                }
            }
        }
    },
    computed: {
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name,
                    fromEmail: this.initialFormData.from_email,
                    subject: this.initialFormData.subject,
                    body: this.initialFormData.body,
                    attachment_name: this.initialFormData.attachment_name
                }
            }
            return {
                name: '',
                fromEmail: '',
                subject: '',
                body: '',
                attachment_name: ''
            }
        }
    }
}
</script>
