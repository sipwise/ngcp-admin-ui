<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
                <q-item-section>
                    <aui-select-contract
                        v-model="data.contract_id"
                        dense
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
                        :error-message="''"
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
    </q-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import AuiSelectContract from 'components/AuiSelectContract'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
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
        }
    },
    data () {
        const data = this.getResellerInitialData()
        return {
            data
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
            if (this.contract) {
                return {
                    label: this.contract.id + ' - ' + this.contract.contact_email,
                    value: this.contract.id
                }
            }
            return null
        },
        hasUnsavedData () {
            const initialData = this.getSubmitData(this.getResellerInitialData())
            const currentData = this.getSubmitData(this.data)
            return _.isEqual(initialData, currentData)
        }
    },
    watch: {
        reseller () {
            this.data = this.getResellerInitialData()
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
        }
    },
    methods: {
        ...mapWaitingActions('resellers', {
            createReseller: 'aui-reseller-create',
            updateReseller: 'aui-reseller-update'
        }),
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
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const submitData = this.getSubmitData(this.data)
                if (this.reseller && this.reseller.id) {
                    await this.updateReseller({
                        resourceId: this.reseller.id,
                        data: submitData
                    })
                } else {
                    await this.createReseller(submitData)
                }
                this.$emit('saved', submitData)
                showGlobalSuccessMessage(this.$t('New reseller created successfully'))
            }
        },
        reset () {
            this.data = this.getResellerInitialData()
        }
    }
}
</script>
