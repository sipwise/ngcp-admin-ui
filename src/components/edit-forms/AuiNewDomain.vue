<template>
    <aui-reseller-form
        layout="4"
        :reseller-id-acl="aclField('reseller_id')"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="hasFieldError('reseller_id')"
        :reseller-id-error-message="getFieldError('reseller_id')"
        @update:reseller-id="updateReseller"
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
                v-if="aclField('domain')"
                required
            >
                <q-input
                    ref="domainInput"
                    v-model.trim="formData.domain"
                    clearable
                    dense
                    class="aui-required"
                    :label="$t('Domain')"
                    data-cy="domain-name"
                    :error="hasFieldError('domain')"
                    :error-message="getFieldError('domain')"
                    :hide-bottom-space="true"
                    :disable="loading"
                    @blur="validateField('domain')"
                    @keyup.enter.prevent="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import {
    required,
    or,
    ipAddress
} from 'vuelidate/lib/validators'
import { isFQDN } from 'boot/vuelidate'
import baseFormMixin from 'src/mixins/base-form'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiNewDomain',
    components: {
        AuiBaseFormField,
        AuiResellerForm
    },
    mixins: [baseFormMixin],
    computed: {
        aclEntity () {
            return 'domains'
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    domain: this.initialFormData.domain
                }
            } else {
                return {
                    reseller_id: null,
                    domain: ''
                }
            }
        }
    },
    methods: {
        updateReseller (resellerId) {
            this.formData.reseller_id = resellerId
        },
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                domain: {
                    required,
                    domainOrIP: or(isFQDN, ipAddress)
                }
            }
        }
    }
}
</script>
