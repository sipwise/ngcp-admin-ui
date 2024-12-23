<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:modelValue="resellerIdUpdate"
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
            #reseller-id-after
        >
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <aui-base-form-field
                v-if="aclField('domain')"
                required
            >
                <q-input
                    v-model.trim="formData.domain"
                    clearable
                    dense
                    :label="$t('Domain')"
                    data-cy="domain-name"
                    :error="hasFieldError('domain')"
                    :error-message="getFieldError('domain')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    ipAddress,
    or,
    required
} from '@vuelidate/validators'
import { isFQDN } from 'boot/vuelidate'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerFormMixin from 'src/mixins/reseller-form'
export default {
    name: 'AuiNewDomain',
    components: {
        AuiCreateResellerButton,
        AuiBaseFormField,
        AuiResellerForm
    },
    mixins: [resellerFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        aclEntity () {
            return 'domains'
        },
        getDefaultData () {
            return {
                reseller_id: null,
                domain: ''
            }
        }
    },
    methods: {
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
