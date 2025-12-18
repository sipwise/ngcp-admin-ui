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
        <template
            #col-1
        >
            <aui-base-form-field
                style="padding: 0 0 14px"
            >
                <q-toggle
                    v-model="formData.enabled"
                    :label="$t('Enabled')"
                    data-cy="headerrules-enabled"
                    :disable="loading"
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
                <q-input
                    v-model.number="formData.priority"
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
                style="padding: 10px 0 14px"
            >
                <q-toggle
                    v-model="formData.stopper"
                    :label="$t('Stopper')"
                    data-cy="headerrules-stopper"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    integer,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewHeaderRule',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        setId: {
            type: String,
            default: null
        },
        subscriberId: {
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
                subscriber_id: this.subscriberId || null,
                set_id: this.setId || null,
                priority: 0,
                name: null,
                description: null,
                direction: 'a_inbound',
                stopper: false,
                enabled: true
            }
        }
    }
}
</script>
