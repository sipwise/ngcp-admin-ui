<template>
    <aui-base-sub-context>
        <!-- TODO change resource-type to 'api' as soon as
            customerlocations endpoint can be filtered by customer_id -->
        <aui-data-table
            v-if="resourceObject"
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
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiCustomerDetailsLocations',
    components: { AuiBaseSubContext, AuiDataTable },
    computed: {
        ...mapState('page', [
            'resourceObject'
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
            return 'customer/' + this.resourceObject.id + '/location/ajax'
        },
        rowActionRouteNames () {
            return [
                'customerLocationEdit',
                'customerLocationPreferences'
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const customerId = this.resourceObject?.id
            if (_.includes(['customerLocationEdit', 'customerLocationPreferences'], route?.name)) {
                route.params.id = customerId
                route.params.locationId = row.id
            }
            return route
        }
    }
}
</script>
