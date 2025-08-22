<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:model-value="resellerIdUpdate"
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
                    v-model.trim="formData.level"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="ncoslevels-level"
                    :error="hasFieldError('level')"
                    :error-message="getFieldError('level')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.mode"
                    :options="modeOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Mode')"
                    data-cy="ncoslevels-mode"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.description"
                    clearable
                    dense
                    :label="$t('Description')"
                    data-cy="ncoslevels-description"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-time-set
                    v-model="formData.time_set_id"
                    dense
                    :initial-option="initialTimeSetOption"
                    :disable="loading"
                    :error="hasFieldError('time_set_id')"
                    :error-message="getFieldError('time_set_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'timeSetCreation' }"
                            :label="$t('Create Time Set')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-time-set>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.time_set_invert"
                    class="q-pb-md"
                    :label="$t('Invert the time set matching')"
                    data-cy="ncoslevels-time_set_invert"
                    :error="false"
                    :disable="formData.time_set_id === null || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.local_ac"
                    class="q-pb-md"
                    :label="$t('Include local area code')"
                    data-cy="ncoslevels-local_ac"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.intra_pbx"
                    class="q-pb-md"
                    :label="$t('Intra PBX Calls within same customer')"
                    data-cy="ncoslevels-intra_pbx"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.expose_to_customer"
                    class="q-pb-md"
                    :label="$t('Expose to customer')"
                    data-cy="ncoslevels-expose_to_customer"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Customers can see and use this NCOS Level in their preferences') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>
<script>
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectTimeSet from 'components/AuiSelectTimeSet'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerFormMixin from 'src/mixins/reseller-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewNCOSLevel',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField,
        AuiSelectTimeSet,
        AuiCreateButton
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        timeset: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapGetters('ncosLevels', [
            'modeOptions'
        ]),
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
                level: null,
                description: null,
                mode: 'whitelist',
                time_set_id: null,
                time_set_invert: false,
                local_ac: false,
                intra_pbx: false,
                expose_to_customer: false
            }
        },
        initialTimeSetOption () {
            return this.timeset
                ? {
                    label: `${this.timeset.id} - ${this.timeset.name}`,
                    value: this.timeset.id
                }
                : null
        }
    },
    watch: {
        'formData.time_set_id': {
            handler (newValue) {
                if (newValue === null) {
                    this.formData.time_set_invert = false
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                level: {
                    required
                },
                mode: {
                    required
                }
            }
        }
    }
}
</script>
