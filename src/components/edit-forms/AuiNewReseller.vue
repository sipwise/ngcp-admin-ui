<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-contract
                                v-model="data.contract_id"
                                dense
                                class="aui-required"
                                :is-reseller="true"
                                :initial-option="initialContractOption"
                                :disable="loading"
                                :error="$v.data.contract_id.$error"
                                :error-message="$errMsg($v.data.contract_id)"
                                @blur="$v.data.contract_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.name"
                                dense
                                clearable
                                class="aui-required"
                                :label="$t('Name')"
                                :disable="loading"
                                :error="$v.data.name.$error"
                                :error-message="$errMsg($v.data.name)"
                                @blur="$v.data.name.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-reseller-status
                                v-model="data.status"
                                dense
                                :label="$t('Status')"
                                :disable="loading"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="data.enable_rtc"
                                class="col"
                                :label="$t('WebRTC')"
                                :disable="loading"
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
import AuiSelectContract from 'components/AuiSelectContract'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import _ from 'lodash'
export default {
    name: 'AuiNewReseller',
    components: {
        AuiSelectContract,
        AuiSelectionResellerStatus
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        reseller: {
            type: Object,
            default: null
        },
        contract: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            data: this.getResellerInitialData()
        }
    },
    validations: {
        data: {
            contract_id: {
                required
            },
            name: {
                required
            }
        }
    },
    computed: {
        initialContractOption () {
            if (this.contract && this.contact) {
                return {
                    label: this.contract.id + ' - ' + this.contact.email,
                    value: this.contract.id
                }
            }
            return null
        },
        hasUnsavedData () {
            const initialData = this.getSubmitData(this.getResellerInitialData())
            const currentData = this.getSubmitData(this.data)
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        reseller () {
            this.data = this.getResellerInitialData()
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        getEmptyReseller () {
            return {
                contract_id: null,
                name: null,
                status: 'active',
                enable_rtc: false
            }
        },
        getResellerInitialData () {
            let initialData = this.getEmptyReseller()
            if (this.reseller !== undefined && this.reseller !== null) {
                initialData = this.reseller
            }
            return { ...initialData }
        },
        getSubmitData (dataObj) {
            return {
                contract_id: dataObj.contract_id,
                name: dataObj.name,
                status: dataObj.status,
                enable_rtc: dataObj.enable_rtc
            }
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const submitData = this.getSubmitData(this.data)
                if (this.reseller && this.reseller.id) {
                    submitData.id = this.reseller.id
                }
                this.$emit('input', submitData)
                this.$parent.$emit('form-input', submitData)
            }
        },
        reset () {
            this.data = this.getResellerInitialData()
            this.$v.$reset()
        }
    }
}
</script>
