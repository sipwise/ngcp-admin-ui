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
                <aui-select-lnp-carrier
                    v-model="formData.carrier_id"
                    dense
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    :label="$t('Description')"
                    data-cy="ncospatterns-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectLnpCarrier from 'components/AuiSelectLnpCarrier'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewNCOSLevelCarrier',
    components: {
        AuiBaseForm,
        AuiBaseFormField,
        AuiSelectLnpCarrier
    },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        ncosLevelId: {
            type: Number,
            default: null
        }

    },
    validations () {
        return {
            formData: {
                carrier_id: {
                    required
                }
            }
        }
    },
    computed: {
        getInitialData () {
            return {
                carrier_id: this.initialFormData.carrier_id || null,
                description: this.initialFormData.description || null,
                ncos_level_id: this.ncosLevelId
            }
        },
        lnpCarrierInitialOption () {
            if (this.profileSet) {
                return {
                    label: this.profileSet.name,
                    value: this.profileSet.id
                }
            }
            return null
        }
    }
}
</script>
