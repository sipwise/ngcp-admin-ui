<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:reseller-id="resellerIdUpdate"
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
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="ncos-set-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.description"
                    clearable
                    dense
                    :label="$t('Description')"
                    data-cy="ncos-set-description"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import resellerFormMixin from 'src/mixins/reseller-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
export default {
    name: 'AuiNewNCOSSet',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        }
    },
    computed: {
        aclEntity () {
            return 'ncos'
        },
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        },
        getDefaultData () {
            return {
                reseller_id: null,
                name: null,
                description: null
            }
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                name: {
                    required
                },
                description: {
                    required
                }
            }
        }
    }
}
</script>
