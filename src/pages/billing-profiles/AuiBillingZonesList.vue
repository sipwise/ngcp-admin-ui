<template>
    <aui-base-sub-context>
        <aui-data-table
            ref="dataTable"
            table-id="billingzones"
            row-key="id"
            resource="billingzones"
            :resource-default-filters="() => ({
                billing_profile_id: billingProfileContextResourceId
            })"
            resource-base-path="billingzone"
            resource-type="api"
            :resource-singular="$t('Zones')"
            :title="$t('Zones')"
            :columns="columns"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'zone',
                    label: $t('Zone'),
                    component: 'input'
                }
            ]"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'billingZoneCreation'}]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :deletable="true"
            :show-header="false"
            :show-more-menu="true"
            :deletion-label="$t('Delete')"
            :deletion-text="'You are about to delete Billing Zones # {subject}'"
            deletion-subject="id"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiBillingZonesList',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        dataTable,
        billingProfileContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'zone',
                    label: this.$t('Zone'),
                    field: 'zone',
                    sortable: true,
                    align: 'left',
                    component: 'input',
                    editable: true
                },
                {
                    name: 'detail',
                    label: this.$t('Zone Details'),
                    field: 'detail',
                    sortable: true,
                    align: 'left',
                    component: 'input',
                    editable: true
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['billingZoneEdit'], route?.name)) {
                route.params.id = this.billingProfileContextResourceId
                route.params.zonesId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'billingZoneEdit'
            ]
        }
    }
}
</script>
