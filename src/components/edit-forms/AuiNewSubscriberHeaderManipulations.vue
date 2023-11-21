<template>
    <aui-base-form
        :layout="$attrs.layout || '6-6'"
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
        <aui-base-form-field>
            <q-input
                v-model.trim="formData.priority"
                clearable
                dense
                :label="$t('Priority')"
                data-cy="headerrules-priority"
                :error="hasFieldError('priority')"
                :error-message="getFieldError('priority')"
                :disable="loading"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <aui-base-form-field
            required
        >
            <q-input
                v-model.trim="formData.name"
                clearable
                dense
                :label="$t('Name')"
                data-cy="headerrules-name"
                :error="hasFieldError('name')"
                :error-message="getFieldError('name')"
                :disable="loading"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-select
                v-model="formData.direction"
                :options="directionOptions"
                data-cy="headerrules-direction"
                emit-value
                map-options
                dense
                :label="$t('Direction')"
                :disable="loading"
                :error="false"
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
                data-cy="headerrules-description"
                :error="hasFieldError('description')"
                :error-message="getFieldError('description')"
                :disable="loading"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="formData.stopper"
                :label="$t('Stopper')"
                data-cy="headerrules-stopper"
                :disable="loading"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="formData.enabled"
                :label="$t('Enabled')"
                data-cy="headerrules-enabled"
                :disable="loading"
            />
        </aui-base-form-field>
    </aui-base-form>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import useValidate from '@vuelidate/core'
import {
    required,
    integer
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiNewSubscriberHeaderManipulations',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        setId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                priority: {
                    integer
                },
                name: {
                    required
                },
                description: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('headerRuleSets', [
            'directionOptions'
        ]),
        getDefaultData () {
            return {
                set_id: this.setId,
                priority: 0,
                name: '',
                description: '',
                direction: 'inbound',
                stopper: false,
                enabled: true
            }
        }
    }
}
</script>
