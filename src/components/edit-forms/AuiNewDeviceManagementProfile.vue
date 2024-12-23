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
                <aui-select-device-configurations
                    v-model="formData.config_id"
                    dense
                    :initial-option="initialDeviceConfigurationOptions"
                    :disable="loading"
                    :error="hasFieldError('config_id')"
                    :error-message="getFieldError('config_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'deviceManagementConfigurationCreation' }"
                            :label="$t('Create device configuration')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-device-configurations>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    dense
                    clearable
                    :label="$t('Profile Name')"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
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
import AuiSelectDeviceConfigurations from 'components/AuiSelectDeviceConfigurations'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewDeviceManagementProfile',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectDeviceConfigurations
    },
    mixins: [baseFormMixin],
    props: {
        deviceConfig: {
            type: Object,
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
                config_id: {
                    required
                },
                name: {
                    required
                }
            }
        }
    },
    computed: {
        initialDeviceConfigurationOptions () {
            if (this.deviceConfig) {
                return {
                    label: `${this.deviceConfig.id} - ${this.deviceConfig.device_id_expand.vendor} - ${this.deviceConfig.device_id_expand.model} - ${this.deviceConfig.version}`,
                    value: this.deviceConfig.id
                }
            }
            return null
        },
        getInitialData () {
            return {
                config_id: this.initialFormData?.config_id || null,
                name: this.initialFormData?.name || null
            }
        }
    }
}
</script>
