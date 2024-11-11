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
                    data-cy="aui-select-pbxdevicemodel"
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
                            data-cy="aui-create-pbxdevicemodel"
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
                    data-cy="aui-pbxdevicefirmware-version"
                    :disable="loading"
                    :error="hasFieldError('version')"
                    :error-message="getFieldError('version')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.tag"
                    dense
                    clearable
                    :label="$t('Firmware tag')"
                    data-cy="aui-pbxdevicefirmware-tag"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <aui-input-file
                    dense
                    hide-hint
                    :label="$t('Firmware file')"
                    data-cy="aui-pbxdevicefirmware-file"
                    :model-value="dataFile"
                    :disable="loading"
                    :loading="loading"
                    :show-btns="false"
                    :error="hasFieldError('filename')"
                    :error-message="getFieldError('filename')"
                    @update:model-value="setFile($event)"
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
import AuiInputFile from 'components/input/AuiInputFile'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewDeviceManagementFirmware',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectDeviceModels,
        AuiInputFile
    },
    mixins: [baseFormMixin],
    props: {
        device: {
            type: Object,
            default: null
        },
        dataFile: {
            type: File,
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
                filename: {
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
                tag: this.initialFormData?.tag || null,
                filename: this.initialFormData?.filename || null,
                firmwareFile: this.dataFile || null
            }
        }
    },
    methods: {
        async setFile (value) {
            this.formData.filename = value
        }
    }
}
</script>
