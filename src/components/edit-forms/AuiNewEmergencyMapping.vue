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
                    v-model.trim="formData.code"
                    dense
                    clearable
                    :label="$t('Emergency Number')"
                    data-cy="emergency-code"
                    :disable="loading"
                    :error="hasFieldError('code')"
                    :error-message="getFieldError('code')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.prefix"
                    dense
                    clearable
                    :label="$t('Emergency Prefix')"
                    data-cy="emergency-prefix"
                    :disable="loading"
                    :error="hasFieldError('prefix')"
                    :error-message="getFieldError('prefix')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.suffix"
                    dense
                    clearable
                    :label="$t('Emergency Suffix')"
                    data-cy="emergency-suffix"
                    :disable="loading"
                    :error="hasFieldError('suffix')"
                    :error-message="getFieldError('suffix')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>
<script>
import useValidate from '@vuelidate/core'
import { integer, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
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
        emergencyContainerId: {
            type: Number,
            default: null
        }
    },
    validations () {
        return {
            formData: {
                code: {
                    required,
                    integer
                }
            }
        }
    },
    data () {
        return {
            v$: useValidate(),
            formData: {
                code: null,
                prefix: null,
                suffix: null,
                emergency_container_id: this.emergencyContainerId
            }
        }
    },
    computed: {
        getInitialData () {
            return {
                code: this.initialFormData?.code || null,
                prefix: this.initialFormData?.prefix || null,
                suffix: this.initialFormData?.suffix || null,
                emergency_container_id: this.emergencyContainerId
            }
        }
    }
}
</script>
