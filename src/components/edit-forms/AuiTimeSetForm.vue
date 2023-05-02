<template>
    <aui-reseller-form
        layout="6"
        dense-list
        :reseller-id="resellerIdValue"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:modelValue="resellerIdUpdate"
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
                v-if="aclField('name')"
                :required="true"
            >
                <q-input
                    v-model="formData.name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    dense
                    :label="$t('Name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('calendarfile')"
            >
                <q-file
                    ref="calendarfileInput"
                    v-model="formData.calendarfile"
                    :label="$t('Calendarfile')"
                    dense
                    :disable="$attrs.loading || $attrs.disable"
                >
                    <template
                        #append
                    >
                        <q-btn
                            icon="folder"
                            text-color="primary"
                            flat
                            dense
                            size="sm"
                            unelevated
                            @click="$refs.calendarfileInput.$el.click()"
                        />
                        <q-btn
                            v-if="formData.calendarfile"
                            class="q-ml-sm"
                            icon="delete"
                            flat
                            dense
                            color="red"
                            text-color="red"
                            size="sm"
                            unelevated
                            @click="deleteFile"
                        />
                    </template>
                </q-file>
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>
<script>
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerForm from 'src/mixins/reseller-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
    name: 'AuiTimeSetForm',
    components: { AuiBaseFormField, AuiResellerForm },
    mixins: [resellerForm],
    props: {
        resellerId: {
            type: [String, Number],
            default: undefined
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        aclEntity () {
            return 'timesets'
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name,
                    calendarfile: undefined
                }
            } else {
                return {
                    reseller_id: null,
                    name: '',
                    calendarfile: undefined
                }
            }
        }
    },
    methods: {
        getValidations () {
            return {
                ...((!this.resellerId) ? this.resellerIdGetValidation() : {}),
                name: {
                    required
                }
            }
        },
        prepareSubmitData (data) {
            if (this.resellerId) {
                data.reseller_id = this.resellerId
            }
            return data
        },
        deleteFile () {
            this.formData.calendarfile = undefined
        }
    }
}
</script>
