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
                <aui-select-billing-vouchers
                    v-model="formData.code"
                    dense
                    :reseller-id="resellerId"
                    :disable="loading"
                    :error="hasFieldError('code')"
                    :error-message="getFieldError('code')"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectBillingVouchers from 'components/AuiSelectBillingVouchers'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiNewTopUpVoucher',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectBillingVouchers
    },
    mixins: [
        baseFormMixin,
        customerContextMixin
    ],
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    methods: {
        getValidations () {
            return {
                code: {
                    required
                }
            }
        }
    }
}
</script>
