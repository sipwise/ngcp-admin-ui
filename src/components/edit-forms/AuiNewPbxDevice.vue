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
                <aui-select-device-profiles
                    v-model="formData.profile_id"
                    dense
                    data-cy="pbx-profile-id"
                    :initial-option="initialDeviceProfileOptions()"
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
import AuiSelectDeviceProfiles from 'components/AuiSelectDeviceProfiles'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapActions } from 'vuex'
export default {
    name: 'AuiNewPbxDevice',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectDeviceProfiles,
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
            async handler (profileId) {
                const profile = await this.getDeviceProfile(profileId)
                const deviceId = profile?.device_id
                this.deviceImage = deviceId ? await this.getPbxDeviceImage(deviceId) : null
                this.linerange = deviceId ? (await this.getDeviceModel(deviceId))?.linerange || [] : []
            }
        }
    },
    methods: {
        ...mapActions('customers', [
            'getPbxDeviceImage',
            'getDeviceModel',
            'getDeviceProfile'
        ]),
        handleConfigUpdate (lines) {
            this.formData.lines = lines
        },
        initialDeviceProfileOptions () {
            if (this.initialFormData?.profile_id) {
                return {
                    label: `${this.initialFormData?.profile_id_expand.device_id} - ${this.initialFormData?.profile_id_expand.device_id_expand.vendor} - ${this.initialFormData?.profile_id_expand.device_id_expand.model}`,
                    value: this.initialFormData?.profile_id
                }
            }
            return null
        }
    }
}
</script>
