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
                    v-model.trim="formData.name"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Name')"
                    data-cy="lnpcarrier-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.prefix"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Prefix')"
                    data-cy="lnpcarrier-prefix"
                    :disable="loading"
                    :error="hasFieldError('prefix')"
                    :error-message="getFieldError('prefix')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.authoritative"
                    class="q-pb-md"
                    :label="$t('Authoritative')"
                    data-cy="lnpcarrier-authoritative"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('If active, and the number is not assigned to a local subscriber, calls to this number are rejected with 404 Not Found.') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.skip_rewrite"
                    class="q-pb-md"
                    :label="$t('Skip rewrite')"
                    data-cy="lnpcarrier-skiprewrite"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('If active, no LNP rewrite rules will be applied after the LNP lookup.') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiNewLnpCarrier',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                prefix: {
                    required
                },
                name: {
                    required
                }
            }
        }
    },
    computed: {
        getDefaultData () {
            return {
                prefix: null,
                name: null,
                authoritative: false,
                skip_rewrite: false

            }
        }
    }
}
</script>
