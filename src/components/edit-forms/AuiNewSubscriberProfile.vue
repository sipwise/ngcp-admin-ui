<template>
    <q-form>
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
                                v-model="data.reseller_id"
                                dense
                                class="aui-required"
                                :initial-option="initialResellerOption"
                                :error="$v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                :error="$v.data.name.$error"
                                :error-message="$errMsg($v.data.name)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.name.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.description"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Description')"
                                :error="$v.data.description.$error"
                                :error-message="$errMsg($v.data.description)"
                                :disable="loading"
                                @blur="$v.data.description.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import _ from 'lodash'
export default {
    name: 'AuiNewSubscriberProfile',
    components: {
        AuiSelectReseller
    },
    props: {
        profile: {
            type: Object,
            default: null
        },
        reseller: {
            type: Object,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            data: this.getDynamicData(this.profile)
        }
    },
    validations: {
        data: {
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
        hasUnsavedData () {
            const initialData = this.getDynamicData(this.profile)
            const currentData = this.getDynamicData(this.data)
            return !_.isEqual(initialData, currentData)
        },
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        }
    },
    watch: {
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        reset () {
            this.data = this.getDynamicData(this.profile)
            this.$v.$reset()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.$emit('input', this.data)
                this.$parent.$emit('form-input', this.data)
            }
        },
        getDynamicData (profile) {
            return {
                // eslint-disable-next-line camelcase
                reseller_id: profile?.reseller_id,
                name: profile?.name,
                description: profile?.description
            }
        }
    }
}
</script>
