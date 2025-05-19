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
                    v-model.trim="formData.name"
                    dense
                    clearable
                    :label="$t('Name')"
                    data-cy="server-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.ip"
                    dense
                    clearable
                    :label="$t('IP Address')"
                    data-cy="server-ip"
                    :disable="loading"
                    :error="v$.formData.ip.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.ip.$errors)"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.host"
                    dense
                    clearable
                    :label="$t('Hostname')"
                    data-cy="server-host"
                    :disable="loading"
                    :error="hasFieldError('host')"
                    :error-message="getFieldError('host')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.port"
                    dense
                    clearable
                    :label="$t('Port')"
                    data-cy="server-port"
                    :disable="loading"
                    :error="hasFieldError('port')"
                    :error-message="getFieldError('port')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.transport"
                    :options="serverProtocolList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Protocol')"
                    data-cy="server-transport"
                    :disable="loading"
                    :error="hasFieldError('transport')"
                    :error-message="getFieldError('transport')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.weight"
                    dense
                    clearable
                    :label="$t('Weight')"
                    data-cy="server-weight"
                    :disable="loading"
                    :error="hasFieldError('weight')"
                    :error-message="getFieldError('weight')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.via_route"
                    :options="serverRouteList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Via Route')"
                    data-cy="server-via_route"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.probe"
                    :label="$t('Enable Probing')"
                    data-cy="server-probe"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="server-enabled"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    integer,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { ip } from 'src/validators/ip'
export default {
    name: 'AuiNewPeeringServer',
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
        groupId: {
            type: Number,
            default: null
        }

    },
    validations () {
        return {
            formData: {
                ip: {
                    required,
                    ip
                },
                name: {
                    required
                },
                port: {
                    required,
                    integer
                },
                weight: {
                    required,
                    integer
                },
                transport: {
                    required
                }
            }
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        getInitialData () {
            return {
                name: this.initialFormData?.name || null,
                ip: this.initialFormData?.ip || null,
                host: this.initialFormData?.host || null,
                port: this.initialFormData?.port || '5060',
                transport: this.initialFormData?.transport || 1,
                weight: this.initialFormData?.weight || '1',
                via_route: this.initialFormData?.via_route || null,
                probe: this.initialFormData?.probe || false,
                enabled: this.initialFormData?.enabled || true,
                group_id: this.groupId
            }
        },
        serverProtocolList () {
            return [
                {
                    value: 1,
                    label: this.$t('UDP')
                },
                {
                    value: 2,
                    label: this.$t('TCP')
                },
                {
                    value: 3,
                    label: this.$t('TLS')
                }
            ]
        },
        serverRouteList () {
            return [
                {
                    value: null,
                    label: this.$t('None')
                }
            ]
        }
    }
}
</script>
