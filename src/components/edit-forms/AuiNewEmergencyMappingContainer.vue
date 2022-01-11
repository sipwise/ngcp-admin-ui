<template>
    <aui-base-form
        layout="5"
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
                v-if="aclField('reseller_id')"
            >
                <aui-select-reseller
                    v-model="formData.reseller_id"
                    dense
                    class="aui-required"
                    :hide-bottom-space="true"
                    :disable="loading"
                    :error="hasFieldError('reseller_id')"
                    :error-message="getFieldError('reseller_id')"
                    @blur="validateField('reseller_id')"
                    @keydown.enter="submit"
                >
                    <template
                        #after
                    >
                        <aui-create-reseller-button
                            :form-data="formData"
                        />
                    </template>
                </aui-select-reseller>
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('name')"
            >
                <q-input
                    v-model.trim="formData.name"
                    dense
                    class="aui-required"
                    :label="$t('Name')"
                    data-cy="emergency-mapping-name"
                    :hide-bottom-space="true"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @blur="validateField('name')"
                    @keydown.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import required from 'vuelidate/lib/validators/required'
export default {
    name: 'AuiNewEmergencyMappingContainer',
    components: {
        AuiCreateResellerButton,
        AuiSelectReseller,
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [
        baseFormMixin
    ],
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name
                }
            } else {
                return {
                    reseller_id: null,
                    name: null
                }
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
                }
            }
        }
    }
}
</script>
