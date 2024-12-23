<template>
    <aui-base-sub-context>
        <!-- TODO change resource-type to 'api' as soon as
            customerlocations endpoint can be filtered by customer_id -->
        <aui-data-table
            v-if="customerContext"
            table-id="customerlocations"
            row-key="id"
            resource="customerlocations"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="customerlocations"
            :resource-alt="resourceUrl"
            resource-type="ajax"
            :resource-singular="$t('Location')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerDetailsLocationCreation' }]"
            :deletable="true"
            deletion-subject="name"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsLocations',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [customerContextMixin],
    computed: {
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
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'blocks_grp',
                    label: this.$t('Network Blocks'),
                    field: 'blocks_grp',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        resourceUrl () {
            return `customer/${this.customerContext.id}/location/ajax`
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const customerId = this.customerContext?.id
            if (_.includes(['customerLocationEdit', 'customerLocationPreferences'], route?.name)) {
                route.params.id = customerId
                route.params.locationId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'customerLocationEdit',
                'customerLocationPreferences'
            ]
        }
    }
}
</script>
