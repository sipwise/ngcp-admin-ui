<template>
    <aui-base-sub-context>
        <div>
            <q-btn
                v-if="isGridView"
                color="primary"
                icon="fas fa-list"
                class="q-mr-xs"
                size="md"
                @click="isGridView = false"
            >
                <q-tooltip>{{ $t('List View') }}</q-tooltip>
            </q-btn>
            <q-btn
                v-if="!isGridView"
                color="primary"
                icon="fas fa-table"
                class="q-mr-xs"
                size="md"
                @click="isGridView = true"
            >
                <q-tooltip>{{ $t('Grid View') }}</q-tooltip>
            </q-btn>
            <q-btn
                color="primary"
                icon="fas fa-retweet"
                class="q-mr-xs"
                size="md"
                :to="{
                    name: callFlow,
                    params: {
                        rowId: $route.params.rowId,
                        callId: encodedCallId
                    }
                }"
                :label="$t('Call Flow')"
            />
        </div>

        <div class="q-pa-lg">
            <q-card
                v-if="!isGridView"
                flat
            >
                <q-card-section class="q-pa-lg">
                    <div
                        v-for="(value, key) in callDetails"
                        :key="key"
                    >
                        <p>
                            <span><strong>{{ key }}</strong></span>:
                            <span>{{ value }}</span>
                        </p>
                    </div>
                </q-card-section>
            </q-card>

            <q-card
                v-for="(fields, groupName) in fieldsGroups"
                v-else
                :key="groupName"
                class="q-mb-lg"
                flat
                bordered
            >
                <q-card-section class="q-pb-none">
                    <h3 class="text-h6 text-primary q-mt-lg q-mb-sm q-ml-md">
                        {{ formatGroupName(groupName) }}
                    </h3>
                </q-card-section>

                <q-card-section class="q-pa-lg">
                    <div class="row q-col-gutter-md q-pr-lg q-pl-lg q-pb-lg">
                        <template
                            v-for="key in fields"
                            :key="key"
                        >
                            <div
                                v-if="callDetails[key] !== undefined"
                                class="col-12 col-sm-6 col-md-4"
                            >
                                <q-card
                                    flat
                                    class="q-pa-sm full-height"
                                >
                                    <div class="text-caption text-grey-7">
                                        {{ key }}
                                    </div>
                                    <div class="text-body1">
                                        {{ formatValue(callDetails[key]) }}
                                    </div>
                                </q-card>
                            </div>
                        </template>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataContextPageMixin from 'src/mixins/data-context-page'

const FIELD_GROUPS = {
    GENERAL_INFO: [
        'id', 'call_id', 'call_type', 'call_status', 'call_code',
        'init_time', 'start_time', 'duration', 'rated_at',
        'rating_status', 'exported_at', 'export_status',
        'peer_auth_realm', 'peer_auth_user'
    ],
    SOURCE_INFO: [
        'source_user_id', 'source_provider_id', 'source_external_subscriber_id',
        'source_external_contract_id', 'source_customer_id', 'source_user',
        'source_domain', 'source_cli', 'source_clir', 'source_user_out',
        'source_ip', 'source_lnp_prefix', 'source_gpp0', 'source_gpp1',
        'source_gpp2', 'source_gpp3', 'source_gpp4', 'source_gpp5',
        'source_gpp6', 'source_gpp7', 'source_gpp8', 'source_gpp9',
        'source_reseller_billing_fee_id', 'source_reseller_billing_zone_id',
        'source_reseller_cost', 'source_reseller_free_time',
        'source_customer_billing_fee_id', 'source_customer_billing_zone_id',
        'source_customer_cost', 'source_customer_free_time',
        'source_carrier_billing_fee_id', 'source_carrier_billing_zone_id',
        'source_carrier_cost', 'source_carrier_free_time'
    ],
    DESTINATION_INFO: [
        'destination_user_id', 'destination_provider_id',
        'destination_external_contract_id', 'destination_external_subscriber_id',
        'destination_customer_id', 'destination_user', 'destination_domain',
        'destination_user_dialed', 'destination_user_in', 'destination_domain_in',
        'destination_user_out', 'destination_lnp_prefix', 'destination_gpp0',
        'destination_gpp1', 'destination_gpp2', 'destination_gpp3',
        'destination_gpp4', 'destination_gpp5', 'destination_gpp6',
        'destination_gpp7', 'destination_gpp8', 'destination_gpp9',
        'destination_reseller_billing_fee_id', 'destination_reseller_billing_zone_id',
        'destination_reseller_cost', 'destination_reseller_free_time',
        'destination_customer_billing_fee_id', 'destination_customer_billing_zone_id',
        'destination_customer_cost', 'destination_customer_free_time',
        'destination_carrier_billing_fee_id', 'destination_carrier_billing_zone_id',
        'destination_carrier_cost', 'destination_carrier_free_time'
    ]
}

export default {
    name: 'AuiSubscriberCallDetailsPage',
    components: { AuiBaseSubContext },
    mixins: [dataContextPageMixin],
    props: {
        resourceObjectId: { type: String, required: true },
        callFlow: { type: String, required: true }
    },
    data () {
        return {
            isGridView: true
        }
    },
    computed: {
        callDetails () {
            return this.getDataContextObject(this.resourceObjectId) || {}
        },
        encodedCallId () {
            return btoa(this.callDetails?.call_id?.toString() || '')
        },
        fieldsGroups () {
            return FIELD_GROUPS
        }

    },
    methods: {
        formatValue (val) {
            return val === null || val === '' ? '-' : val
        },
        formatGroupName (groupName) {
            return groupName.replace(/_/g, ' ')
        }
    }
}
</script>
