<template>
    <aui-base-sub-context>
        <div
            v-if="!$wait.is(downloadWaitIdentifier) && customerContext && !customerContextHasSubscribers"
            class="proxy-warning q-pa-xs text-left q-pb-lg"
        >
            <q-icon
                name="warning"
                size="xs"
                color="warning"
            />
            {{ $t('At least a subscriber has to be created before adding groups.') }}
        </div>
        <aui-data-table
            v-if="customerContext"
            table-id="pbxgroups"
            row-key="id"
            resource="subscribers"
            resource-search-field="username"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({
                customer_id: customerContext.id,
                is_pbx_group: '1'
            })"
            resource-type="api"
            :resource-singular="$t('Pbx Group')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="customerContext && customerContextHasSubscribers"
            :add-action-routes="[{ name: 'customerDetailsPbxGroupCreation' }]"
            :deletable="true"
            deletion-subject="display_name"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :search-criteria-config="[
                {
                    criteria: 'username',
                    label: $t('Name'),
                    component: 'input'
                },
                {
                    criteria: 'pbx_extension',
                    label: $t('Extension'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { WAIT_PAGE } from 'src/constants'
import {
    required,
    integer
} from 'vuelidate/lib/validators'
import customerSubscriberContextMixin from 'src/mixins/data-context-pages/customer-details-subscriber'
import {
    mapGetters
} from 'vuex'
export default {
    name: 'AuiCustomerDetailsPbxGroups',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [
        customerContextMixin,
        customerSubscriberContextMixin
    ],
    computed: {
        ...mapGetters('customers', [
            'subscriberCommonPbxHuntPolicyOptions',
            'subscriberCommonPbxHuntCancelModeOptions'
        ]),
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'display_name',
                    label: this.$t('Name'),
                    field: 'display_name',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'pbx_extension',
                    label: this.$t('Extension'),
                    field: 'pbx_extension',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        }
                    ]
                },
                {
                    name: 'pbx_hunt_policy',
                    label: this.$t('Hunt Policy'),
                    field: 'pbx_hunt_policy',
                    editable: true,
                    sortable: true,
                    align: 'left',
                    component: 'select',
                    componentOptions: this.subscriberCommonPbxHuntPolicyOptions
                },
                {
                    name: 'pbx_hunt_timeout',
                    label: this.$t('Hunt Timeout'),
                    field: 'pbx_hunt_timeout',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        },
                        {
                            name: 'integer',
                            validator: integer,
                            error: this.$t('Only none decimal numbers are allowed')
                        }
                    ]
                },
                {
                    name: 'pbx_hunt_cancel_mode',
                    label: this.$t('Cancel Mode'),
                    field: 'pbx_hunt_cancel_mode',
                    editable: true,
                    sortable: true,
                    align: 'left',
                    component: 'select',
                    componentOptions: this.subscriberCommonPbxHuntCancelModeOptions
                }
            ]
        },
        downloadWaitIdentifier () {
            return WAIT_PAGE
        }
    },
    async mounted () {
        await this.fetchCustomerContextSubscribers()
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.customerContext.id
            route.params.pbxGroup = row.id
            return route
        },
        rowActions () {
            return [
                'customerDetailsPbxGroupEdit',
                'customerDetailsPbxGroupPreferences',
                'customerDetailsPbxGroupDetails'
            ]
        }
    }
}
</script>
