<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="customerContext"
            :key="customerContext.id"
            table-id="customerlocations"
            row-key="id"
            resource="customerlocations"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="customerlocations"
            resource-type="api"
            :resource-default-filters="() => ({
                contract_id: customerContext.id
            })"
            :resource-singular="$t('Location')"
            title=""
            :columns="columns"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
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
                    name: 'blocks',
                    label: this.$t('Network Blocks'),
                    field: 'blocks',
                    sortable: false,
                    align: 'left',
                    formatter: ({ value }) => this.formatLocationBlocks(value)
                }
            ]
        }
    },
    methods: {
        formatLocationBlocks (blocks) {
            if (!Array.isArray(blocks) || blocks.length === 0) {
                return this.$t('N/A')
            }

            const formattedBlocks = blocks
                .map(({ ip, mask }) => mask ? `${ip}/${mask}` : ip)
                .filter(Boolean)

            return formattedBlocks.join(', ') || this.$t('N/A')
        },
        rowActionRouteIntercept ({ route, row }) {
            if (route?.name === 'customerLocationEdit' || route?.name === 'customerLocationPreferences') {
                route.params.id = this.customerContext?.id
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
