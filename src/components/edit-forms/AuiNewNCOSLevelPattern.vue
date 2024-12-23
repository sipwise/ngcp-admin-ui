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
                    v-model.trim="formData.pattern"
                    dense
                    clearable
                    :label="$t('Pattern')"
                    data-cy="ncospatterns-pattern"
                    :disable="loading"
                    :error="hasFieldError('pattern')"
                    :error-message="getFieldError('pattern')"
                    @keyup.enter="submit"
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
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewNCOSLevelPattern',
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
        ncosLevelId: {
            type: Number,
            default: null
        },
        ncosLnpListId: {
            type: Number,
            default: null
        }

    },
    validations () {
        return {
            formData: {
                pattern: {
                    required,
                    isValidRegExp (value) {
                        try {
                            // eslint-disable-next-line no-new
                            new RegExp(value)
                            return true
                        } catch (e) {
                            return false
                        }
                    }
                }
            }
        }
    },
    computed: {
        getInitialData () {
            const id = this.ncosLnpListId ? { ncos_lnp_list_id: this.ncosLnpListId } : { ncos_level_id: this.ncosLevelId }
            return {
                ...id,
                pattern: this.initialFormData?.pattern || null,
                description: this.initialFormData?.description || null
            }
        }
    }
}
</script>
