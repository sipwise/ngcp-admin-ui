<template>
    <aui-base-form
        layout="6"
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
                <aui-select-device-models
                    v-model="formData.device_id"
                    dense
                    :initial-option="initialDeviceModelOptions"
                    :disable="loading"
                    :error="hasFieldError('device_id')"
                    :error-message="getFieldError('device_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'deviceManagementModelCreation' }"
                            :label="$t('Create device model')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-device-models>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.version"
                    dense
                    clearable
                    :label="$t('Version')"
                    :disable="loading"
                    :error="hasFieldError('version')"
                    :error-message="getFieldError('version')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.content_type"
                    dense
                    clearable
                    :label="$t('Content type')"
                    :disable="loading"
                    :error="hasFieldError('content_type')"
                    :error-message="getFieldError('content_type')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.content"
                    clearable
                    dense
                    type="textarea"
                    :label="$t('Content')"
                    :error="hasFieldError('content')"
                    :error-message="getFieldError('content')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectDeviceModels from 'components/AuiSelectDeviceModels'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewDeviceManagementConfiguration',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectDeviceModels
    },
    mixins: [baseFormMixin],
    props: {
        device: {
            type: Object,
            default: null
        },
        content: {
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
                device_id: {
                    required
                },
                version: {
                    required
                },
                content_type: {
                    required
                },
                content: {
                    required
                }
            }
        }
    },
    computed: {
        initialDeviceModelOptions () {
            if (this.device) {
                return {
                    label: `${this.device.id} - ${this.device.vendor} - ${this.device.model}`,
                    value: this.device.id
                }
            }
            return null
        },
        getInitialData () {
            return {
                device_id: this.initialFormData?.device_id || null,
                version: this.initialFormData?.version || null,
                content_type: this.initialFormData?.content_type || 'text/xml',
                content: this.content || null
            }
        }
    }
}
</script>
