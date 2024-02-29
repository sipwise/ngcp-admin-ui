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
                <aui-select-invoice-template
                    v-model="formData.template_id"
                    dense
                    :disable="loading"
                    :error="hasFieldError('template_id')"
                    :error-message="getFieldError('template_id')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <aui-select-all-contract
                    v-model="formData.customer_id"
                    dense
                    :disable="loading"
                    :error="hasFieldError('customer_id')"
                    :error-message="getFieldError('customer_id')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.period"
                    class="col q-mr-md"
                    dense
                    clearable
                    :label="$t('Invoice Period')"
                    :error="hasFieldError('period')"
                    :error-message="getFieldError('period')"
                >
                    <q-tooltip>
                        {{ $t('YYYY-MM') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiSelectAllContract from 'components/AuiSelectAllContract'
import AuiSelectInvoiceTemplate from 'components/AuiSelectInvoiceTemplate'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import { date } from 'src/validators/common'
export default {
    name: 'AuiNewInvoice',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectAllContract,
        AuiSelectInvoiceTemplate
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                customer_id: {
                    required
                },
                period: {
                    required,
                    date
                }
            }
        }
    },
    computed: {
        getDefaultData () {
            return {
                customer_id: null,
                template_id: null,
                period: ''

            }
        }
    }
}
</script>
