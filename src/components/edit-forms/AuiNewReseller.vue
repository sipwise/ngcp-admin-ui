<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
                <q-item-section>
                    <aui-select-contract
                        v-model="contract_id"
                        dense
                        :error="$v.contract_id.$error"
                        :error-message="$errMsg($v.contract_id)"
                        @blur="$v.contract_id.$touch()"
                    />
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-input
                        v-model.trim="name"
                        dense
                        clearable
                        :label="$t('Name')"
                        :disable="loading"
                        :error="$v.name.$error"
                        :error-message="$errMsg($v.name)"
                        @blur="$v.name.$touch()"
                    />
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <aui-selection-reseller-status
                        v-model="status"
                        dense
                        :label="$t('Status')"
                        :error="false"
                        :error-message="''"
                    />
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-toggle
                        v-model="enable_rtc"
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
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
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
        }
    },
    data () {
        return {
            contract_id: null,
            name: null,
            status: 'active',
            enable_rtc: false
        }
    },
    validations: {
        contract_id: {
            required
        },
        name: {
            required
        }
    },
    computed: {
        ...mapWaitingGetters({
            processingCreateReseller: 'processing createReseller'
        })
    },
    watch: {
        processingCreateReseller (value) {
            this.$emit('processing', value)
        }
    },
    methods: {
        ...mapWaitingActions('resellers', {
            createReseller: 'processing createReseller'
        }),
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    const submitData = {
                        contract_id: this.contract_id,
                        name: this.name,
                        status: this.status,
                        enable_rtc: this.enable_rtc
                    }
                    await this.createReseller(submitData)
                    this.$emit('saved', submitData)
                    showGlobalSuccessMessage(this.$t('New reseller created successfully'))
                } catch (err) {
                    showGlobalErrorMessage(err)
                }
            }
        }
    }
}
</script>
