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
                    v-model="formData.profile_id"
                    dense
                    data-cy="pbx-profile-id"
                    :disable="loading"
                    :error="hasFieldError('profile_id')"
                    :error-message="getFieldError('profile_id')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.identifier"
                    clearable
                    dense
                    :label="$t('Mac Address')"
                    data-cy="pbx-identifier"
                    :error="hasFieldError('identifier')"
                    :error-message="getFieldError('identifier')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.station_name"
                    clearable
                    dense
                    :label="$t('Station Name')"
                    data-cy="pbx-station-name"
                    :error="hasFieldError('station_name')"
                    :error-message="getFieldError('station_name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
        <aui-pbx-device-config
            :image="deviceImage"
            :linerange="linerange"
            :initial-lines="initialFormData?.lines || []"
            @update-config="handleConfigUpdate"
        />
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiPbxDeviceConfig from 'components/AuiPbxDeviceConfig'
import AuiSelectDeviceModels from 'components/AuiSelectDeviceModels'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapActions } from 'vuex'
export default {
    name: 'AuiNewPbxDevice',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectDeviceModels,
        AuiPbxDeviceConfig
    },
    mixins: [baseFormMixin],
    props: {
        device: {
            type: Object,
            default: null
        },
        customerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate(),
            deviceImage: null,
            linerange: []
        }
    },
    validations () {
        return {
            formData: {
                profile_id: {
                    required
                },
                identifier: {
                    required
                },
                station_name: {
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
                customer_id: this.customerId,
                profile_id: this.initialFormData?.profile_id || null,
                identifier: this.initialFormData?.identifier || null,
                station_name: this.initialFormData?.station_name || null,
                lines: this.initialFormData?.lines || []
            }
        }
    },
    watch: {
        'formData.profile_id': {
            immediate: true,
            async handler (id) {
                this.deviceImage = id ? await this.getPbxDeviceImage(id) : null
                this.linerange = id ? (await this.getDeviceModel(id))?.linerange || [] : []
            }
        }
    },
    methods: {
        ...mapActions('customers', [
            'getPbxDeviceImage',
            'getDeviceModel'
        ]),
        handleConfigUpdate (lines) {
            this.formData.lines = lines
        }
    }
}
</script>
