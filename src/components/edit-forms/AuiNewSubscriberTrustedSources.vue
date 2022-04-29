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
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.src_ip"
                    dense
                    clearable
                    :label="$t('Source IP')"
                    data-cy="trustedsources-src_ip"
                    :disable="loading"
                    :error="$v.formData.src_ip.$error"
                    :error-message="$errMsg($v.formData.src_ip)"
                >
                    <q-tooltip>
                        {{ $t('The source IP address.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.protocol"
                    :options="trustedSourcesProtocolList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Protocol')"
                    data-cy="trustedsources-protocol"
                    :disable="loading"
                    :error="false"
                >
                    <q-tooltip>
                        {{ $t('The transport protocol(one of UDP, TCP, TLS, ANY).') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.from_pattern"
                    dense
                    clearable
                    :label="$t('From Pattern')"
                    data-cy="trustedsources-from_pattern"
                    :disable="loading"
                    :error="false"
                >
                    <q-tooltip>
                        {{ $t('A regular expression matching the From URI.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import { ip } from 'src/validators/ip'
import {
    required
} from 'vuelidate/lib/validators'
export default {
    name: 'AuiNewSubscriberTrustedSources',
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
    validations () {
        return {
            formData: {
                src_ip: {
                    required,
                    ip: ip
                }
            }
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
                    src_ip: this.initialFormData.src_ip,
                    protocol: this.initialFormData.protocol,
                    from_pattern: this.initialFormData.from_pattern,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    src_ip: null,
                    protocol: 'UDP',
                    from_pattern: null,
                    subscriber_id: this.subscriberId
                }
            }
        },
        trustedSourcesProtocolList () {
            return [
                {
                    value: 'UDP',
                    label: this.$t('UDP')
                },
                {
                    value: 'TCP',
                    label: this.$t('TCP')
                },
                {
                    value: 'TLS',
                    label: this.$t('TLS')
                },
                {
                    value: 'ANY',
                    label: this.$t('ANY')
                }
            ]
        }
    }
}
</script>
