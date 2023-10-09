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
                            <q-input
                                v-model.trim="formData.zone"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Zone')"
                                data-cy="biiling-zone"
                                :error="v$.formData.zone.$errors.length > 0"
                                :error-message="$errMsg(v$.formData.zone.$errors)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A short name of the zone') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.detail"
                                clearable
                                dense
                                :label="$t('Detail')"
                                data-cy="billing-detail"
                                :disable="loading"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The detailed name for the zone') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewBillingZones',
    components: {
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        billingProfileId: {
            type: Number,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
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
                zone: {
                    required
                }
            }
        }
    },
    computed: {
        getDefaultData () {
            return {
                zone: null,
                detail: null,
                billing_profile_id: this.billingProfileId
            }
        }
    }
}
</script>
