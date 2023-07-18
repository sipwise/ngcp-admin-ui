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
            <aui-base-form-field>
                <q-input
                    :value="$t('PBX Group')"
                    :label="$t('Type')"
                    readonly
                    dense
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.display_name"
                    dense
                    clearable
                    :label="$t('Name')"
                    data-cy="pbxgroup-display_name"
                    :disable="loading"
                    :error="hasFieldError('display_name')"
                    :error-message="getFieldError('display_name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pbx_extension"
                    dense
                    clearable
                    :label="$t('Extension')"
                    data-cy="pbxgroup-pbx_extension"
                    :disable="loading"
                    :error="hasFieldError('pbx_extension')"
                    :error-message="getFieldError('pbx_extension')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.pbx_hunt_policy"
                    :options="subscriberCommonPbxHuntPolicyOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Hunting Policy')"
                    data-cy="pbxgroup-pbx_hunt_policy"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pbx_hunt_timeout"
                    dense
                    clearable
                    :label="$t('Hunting Timeout')"
                    data-cy="pbxgroup-pbx_hunt_timeout"
                    :disable="loading"
                    :error="hasFieldError('pbx_hunt_timeout')"
                    :error-message="getFieldError('pbx_hunt_timeout')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.pbx_hunt_cancel_mode"
                    :options="subscriberCommonPbxHuntCancelModeOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Cancel Mode')"
                    data-cy="pbxgroup-pbx_hunt_cancel_mode"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import customerSubscriberContextMixin from 'src/mixins/data-context-pages/customer-details-subscriber'
import {
    required,
    integer
} from 'vuelidate/lib/validators'
export default {
    name: 'AuiNewPbxGroup',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [
        baseFormMixin,
        customerSubscriberContextMixin
    ],
    computed: {
        getDefaultData () {
            return {
                display_name: null,
                pbx_extension: null,
                pbx_hunt_policy: 'serial',
                pbx_hunt_timeout: 10,
                pbx_hunt_cancel_mode: 'cancel'
            }
        }
    },
    methods: {
        getValidations () {
            return {
                display_name: !this.initialFormData ? {
                    required
                } : {},
                pbx_extension: {
                    required
                },
                pbx_hunt_timeout: {
                    required,
                    integer
                }
            }
        }
    }
}
</script>
