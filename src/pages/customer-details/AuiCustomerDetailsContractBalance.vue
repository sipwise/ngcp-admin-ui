<template>
    <aui-base-sub-context>
        <div
            v-if="customerContext"
            class="q-gutter-md items-center"
        >
            <div class="row q-gutter-md items-center">
                <div class="col">
                    <q-card
                        flat
                        bordered
                        class="q-pa-md"
                        style="min-height:450px; min-width:250px"
                    >
                        <div class="text-h6 q-pl-sm">
                            {{ $t('Current status') }}
                        </div>

                        <q-list>
                            <aui-master-data-item
                                :label="$t('Initial Cash Balance')"
                                :value="contractBalance.initial_cash_balance"
                            />

                            <aui-master-data-item
                                :label="$t('Cash Balance')"
                                :value="contractBalance.cash_balance"
                            />

                            <aui-master-data-item
                                :label="$t('Debit')"
                                :value="contractBalance.cash_debit"
                            />

                            <q-btn
                                class="q-ma-sm q-ml-md"
                                color="primary"
                                size="sm"
                                :label="$t('Set Cash Balance')"
                                :to="setCashBalance"
                                unelevated
                            />

                            <q-separator
                                spaced
                                inset
                            />

                            <aui-master-data-item
                                :label="$t('Initial Free-Time Balance')"
                                :value="contractBalance.initial_free_time_balance"
                            />

                            <aui-master-data-item
                                :label="$t('Free-Time Balance')"
                                :value="contractBalance.free_time_balance"
                            />

                            <aui-master-data-item
                                :label="$t('Free-Time Spent')"
                                :value="contractBalance.free_time_spent"
                            />
                        </q-list>
                    </q-card>
                </div>
                <div class="col">
                    <q-card
                        flat
                        class="q-pa-md"
                        bordered
                        style="min-height:450px; min-width:fit-content"
                    >
                        <div class="text-h6 q-pa-sm">
                            {{ $t('Top-up status') }}
                        </div>

                        <div
                            class="col-9"
                        >
                            <list>
                                <q-btn
                                    v-if="customerContext"
                                    class="q-ma-sm"
                                    color="primary"
                                    size="sm"
                                    :label="$t('Top-up Voucher')"
                                    :to="topUpVoucher"
                                    unelevated
                                />
                                <q-btn
                                    class="q-ma-sm"
                                    color="primary"
                                    size="sm"
                                    :label="$t('Top-up Cash')"
                                    :to="topUpCash"
                                    unelevated
                                />
                            </list>
                        </div>

                        <q-separator
                            spaced
                            inset
                        />

                        <q-list class="q-mt-sm">
                            <aui-master-data-item
                                :label="$t('Interval from')"
                                :value="contractBalance.start"
                            />

                            <aui-master-data-item
                                :label="$t('Interval to')"
                                :value="contractBalance.end"
                            />

                            <aui-master-data-item
                                :label="$t('Timely Top-ups from')"
                                :value="contractBalance.timely_topup_start"
                            />

                            <aui-master-data-item
                                :label="$t('Timely Top-ups to')"
                                :value="contractBalance.timely_topup_stop"
                            />

                            <aui-master-data-item
                                :label="$t('Balance will be discarded, if no top-up happens until')"
                                :value="contractBalance.notopup_discard_expiry"
                            />
                        </q-list>
                    </q-card>
                </div>
            </div>
            <div class="row q-gutter-md items-center">
                <div class="col">
                    <q-card
                        flat
                        bordered
                        class="q-pa-md"
                    >
                        <div class="text-h6 q-pl-sm q-pt-sm q-ml-md">
                            {{ $t('Billing and package profiles') }}
                        </div>

                        <q-list class="q-pl-md">
                            <aui-master-data-item
                                :label="$t('Actual profile package')"
                                :value="customerContext?.profile_package_id_expand?.name"
                            />

                            <aui-master-data-item
                                :label="$t('Actual billing profile')"
                                :value="contractBalance.billing_profile_id_expand?.name"
                            />

                            <aui-master-data-item
                                :label="$t('Cash balance threshold when underrun profiles get applied')"
                                :value="customerContext?.profile_package_id_expand?.underrun_profile_threshold"
                            />

                            <aui-master-data-item
                                :label="$t('Cash balance threshold when subscribers will be locked')"
                                :value="customerContext?.profile_package_id_expand?.underrun_lock_threshold"
                            />
                        </q-list>
                    </q-card>
                </div>
            </div>
        </div>
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiMasterDataItem from 'pages/subscriber-details/AuiMasterDataItem'
import { WAIT_PAGE } from 'src/constants'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { watch } from 'vue'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'

export default {
    name: 'AuiCustomerDetailsContractBalance',
    components: {
        AuiBaseSubContext,
        AuiMasterDataItem
    },
    mixins: [
        customerContextMixin
    ],
    computed: {
        ...mapState('customers', [
            'contractBalance',
            'profilePackage'
        ]),
        customerId () {
            return this.customerContext?.id
        },
        topUpVoucher () {
            return { name: 'topUpVoucher' }
        },
        topUpCash () {
            return { name: 'topUpCash' }
        },
        setCashBalance () {
            return { name: 'setCashBalance', params: { balanceId: this.customerContext?.id } }
        }
    },
    async mounted () {
        watch(() => this.customerId, async () => {
            await this.load()
        }, { immediate: true })
    },
    methods: {
        ...mapWaitingActions('customers', {
            loadContractBalance: WAIT_PAGE
        }),
        async load () {
            await this.loadContractBalance(this.customerContextContact?.id)
        }
    }
}
</script>
