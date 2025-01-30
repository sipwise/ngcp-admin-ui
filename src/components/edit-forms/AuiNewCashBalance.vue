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
                <q-input
                    v-model.trim="formData.cash_balance"
                    clearable
                    dense
                    :label="$t('Cash Balance')"
                    data-cy="cash-balance"
                    :error="hasFieldError('cash_balance')"
                    :error-message="getFieldError('cash_balance')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.free_time_balance"
                    clearable
                    dense
                    :label="$t('Free-Time Balance')"
                    data-cy="free_time_balance"
                    :error="hasFieldError('free_time_balance')"
                    :error-message="getFieldError('free_time_balance')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewCashBalance',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [
        baseFormMixin
    ],
    props: {
        resellerId: {
            type: Number,
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
                cash_balance: {
                    required,
                    numeric
                },
                free_time_balance: {
                    required,
                    numeric
                }
            }
        }
    },
    computed: {
        getInitialData () {
            return {
                cash_balance: this.initialFormData?.cash_balance || 0,
                free_time_balance: this.initialFormData?.free_time_balance || 0
            }
        }
    }
}
</script>
