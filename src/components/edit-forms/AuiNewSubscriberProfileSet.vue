<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list>
                    <q-item>
                        <q-item-section>
                            <aui-select-reseller
                                v-model="formData.reseller_id"
                                dense
                                class="aui-required"
                                :initial-option="initialResellerOption"
                                :error="$v.formData.reseller_id.$error"
                                :error-message="$errMsg($v.formData.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                :error="$v.formData.name.$error"
                                :error-message="$errMsg($v.formData.name)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.name.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.description"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Description')"
                                :error="$v.formData.description.$error"
                                :error-message="$errMsg($v.formData.description)"
                                :disable="loading"
                                @blur="$v.formData.description.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewSubscriberProfileSet',
    components: {
        AuiBaseForm,
        AuiSelectReseller
    },
    mixins: [baseFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        }
    },
    validations: {
        formData: {
            reseller_id: {
                required
            },
            name: {
                required
            },
            description: {
                required
            }
        }
    },
    computed: {
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name,
                    description: this.initialFormData.description
                }
            } else {
                return {
                    reseller_id: null,
                    name: null,
                    description: null
                }
            }
        }
    }
}
</script>
