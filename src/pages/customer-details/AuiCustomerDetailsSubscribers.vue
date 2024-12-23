<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="customerContext"
            table-id="subscribers"
            row-key="id"
            resource="subscribers"
            resource-search-field="username"
            :resource-search-wildcard="true"
            :resource-default-filters="() => {
                return {
                    customer_id: customerContext.id,
                    is_pbx_group: 0
                }
            }"
            resource-type="api"
            :resource-singular="$t('Subscriber')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerSubscriberCreate' }]"
            :deletable="true"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="username"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionsIntercept"
            :search-criteria-config="[
                {
                    criteria: 'profile_id',
                    label: $t('Subscriber Profile ID'),
                    component: 'input'
                },
                {
                    criteria: 'username',
                    label: $t('Username'),
                    component: 'input'
                },
                {
                    criteria: 'webusername',
                    label: $t('Webusername'),
                    component: 'input'
                },
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                },
                {
                    criteria: 'customer_id',
                    label: $t('Customer ID'),
                    component: 'input'
                },
                {
                    criteria: 'customer_external_id',
                    label: $t('Customer External ID'),
                    component: 'input'
                },
                {
                    criteria: 'subscriber_external_id',
                    label: $t('Subscriber External ID'),
                    component: 'input'
                },
                {
                    criteria: 'alias',
                    label: $t('Alias'),
                    component: 'input'
                },
                {
                    criteria: 'reseller_id',
                    label: $t('Reseller ID'),
                    component: 'input'
                },
                {
                    criteria: 'contact_id',
                    label: $t('Contact ID'),
                    component: 'input'
                },
                {
                    criteria: 'primary_number',
                    label: $t('Primary Number'),
                    component: 'input'
                },
                {
                    criteria: 'pbx_extension',
                    label: $t('PBX Extension'),
                    component: 'input'
                },
                {
                    criteria: 'display_name',
                    label: $t('Display Name'),
                    component: 'input'
                },
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiCustomerDetailsSubscribers',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [
        dataTable,
        dataTableColumn,
        customerContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'subscriberType',
                    label: this.$t('Type'),
                    field: 'id',
                    sortable: false,
                    align: 'left',
                    formatter: ({ row }) => {
                        if (this.customerContextIsPbx && row.is_pbx_pilot) {
                            return this.$t('PBX Pilot')
                        } else if (this.customerContextIsPbx) {
                            return this.$t('PBX Seat')
                        }
                        return this.$t('Subscriber')
                    }
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'username',
                    sortable: true,
                    align: 'left'
                },
                ...(!this.customerContextIsPbx
                    ? [
                        this.getDomainColumn(),
                        this.getPhoneNumberColumn()
                    ]
                    : [
                        this.getPbxExtension()
                    ]
                )
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'subscriberDetails',
                'subscriberPreferences',
                'customerSubscriberEdit'
            ]
        },
        rowActionsIntercept ({ route, row }) {
            if (route.name === 'customerSubscriberEdit') {
                route.params.id = this.customerContext.id
                route.params.subscriberId = row.id
            }
            return route
        }
    }
}
</script>
