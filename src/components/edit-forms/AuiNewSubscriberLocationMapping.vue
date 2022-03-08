<template>
    <aui-base-form
        layout="6-6"
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
        <template #col-1>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.location"
                    dense
                    clearable
                    :label="$t('Location SIP-URI')"
                    data-cy="locationmapping-location"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.caller_pattern"
                    dense
                    clearable
                    :label="$t('Caller Pattern')"
                    data-cy="locationmapping-caller_pattern"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.callee_pattern"
                    dense
                    clearable
                    :label="$t('Callee Pattern')"
                    data-cy="locationmapping-callee_pattern"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.mode"
                    :options="locationMappingModeList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Mode')"
                    data-cy="locationmapping-mode"
                    :disable="loading"
                    :error="false"
                >
                    <q-tooltip>
                        {{ $t('The location lookup mode') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.to_username"
                    dense
                    clearable
                    :label="$t('To Username')"
                    data-cy="locationmapping-to_username"
                    :disable="loading"
                    :error="false"
                >
                    <q-tooltip>
                        {{ $t('Replace To username with the value') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.external_id"
                    dense
                    clearable
                    :label="$t('External ID')"
                    data-cy="locationmapping-external_id"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    class="col"
                    :label="$t('Enabled')"
                    data-cy="enabled"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewSubscriberLocationMapping',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        subscriberId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            formData: this.getInitialData
        }
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    location: this.initialFormData.location,
                    caller_pattern: this.initialFormData.caller_pattern,
                    callee_pattern: this.initialFormData.callee_pattern,
                    mode: this.initialFormData.callee_pattern,
                    to_username: this.initialFormData.to_username,
                    external_id: this.initialFormData.external_id,
                    enabled: this.initialFormData.enabled,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    location: null,
                    caller_pattern: null,
                    callee_pattern: null,
                    mode: 'add',
                    to_username: null,
                    external_id: null,
                    enabled: true,
                    subscriber_id: this.subscriberId
                }
            }
        },
        locationMappingModeList () {
            return [
                {
                    value: 'add',
                    label: this.$t('Add')
                },
                {
                    value: 'replace',
                    label: this.$t('Replace')
                },
                {
                    value: 'offline',
                    label: this.$t('Offline')
                },
                {
                    value: 'forward',
                    label: this.$t('Forward')
                }
            ]
        }
    }
}
</script>
