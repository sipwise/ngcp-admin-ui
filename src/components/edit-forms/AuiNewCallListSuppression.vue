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
                    v-model.trim="formData.domain"
                    dense
                    clearable
                    :label="$t('Domain')"
                    data-cy="calllistsuppression-domain"
                    :disable="loading"
                    :error="hasFieldError('domain')"
                    :error-message="getFieldError('domain')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.direction"
                    :options="directionList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Direction')"
                    data-cy="calllistsuppression-direction"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pattern"
                    dense
                    clearable
                    :label="$t('Pattern')"
                    data-cy="calllistsuppression-pattern"
                    :disable="loading"
                    :error="hasFieldError('pattern')"
                    :error-message="getFieldError('pattern')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.mode"
                    :options="modeList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Mode')"
                    data-cy="calllistsuppression-mode"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.label"
                    dense
                    clearable
                    :label="$t('Label')"
                    data-cy="calllistsuppression-label"
                    :disable="loading"
                    :error="hasFieldError('label')"
                    :error-message="getFieldError('label')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import {
    required
} from 'vuelidate/lib/validators'
export default {
    name: 'AuiNewCallListSuppression',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [
        baseFormMixin
    ],
    computed: {
        getDefaultData () {
            return {
                direction: 'outgoing',
                domain: null,
                label: null,
                mode: 'filter',
                pattern: null
            }
        },
        modeList () {
            return [
                {
                    value: 'filter',
                    label: this.$t('filter')
                },
                {
                    value: 'obfuscate',
                    label: this.$t('obfuscate')
                },
                {
                    value: 'disabled',
                    label: this.$t('disabled')
                }
            ]
        },
        directionList () {
            return [
                {
                    value: 'outgoing',
                    label: this.$t('outgoing')
                },
                {
                    value: 'incoming',
                    label: this.$t('incoming')
                }
            ]
        }
    },
    methods: {
        getValidations () {
            return {
                domain: {
                    required
                },
                pattern: {
                    required
                },
                label: {
                    required
                }
            }
        }
    }
}
</script>
