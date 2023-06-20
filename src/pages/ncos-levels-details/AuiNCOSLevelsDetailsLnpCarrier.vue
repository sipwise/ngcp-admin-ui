<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="ncoslevelContext"
            ref="lnpCarrierTab"
            table-id="ncoslnpcarriers"
            row-key="id"
            resource="ncoslnpcarriers"
            :resource-default-filters="() => ({
                ncos_level_id: ncoslevelContext.id
            })"
            resource-base-path="ncoslnpcarriers"
            resource-type="api"
            :resource-singular="$t('NCOS LNP Carriers')"
            title=""
            :columns="columns"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'ncosLevelsDetailsLnpCarrierCreation' }]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrier',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [ncoslevelContextMixin],
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
                    name: 'carrier_id',
                    label: this.$t('LNP Carrier ID'),
                    field: 'carrier_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.ncoslevelContext.id
            route.params.lnpCarrierId = row.id
            return route
        },
        rowActions ({ row }) {
            return [
                'ncosLevelsDetailsLnpCarrierEdit',
                'ncosLevelsDetailsLnpCarrierPattern'
            ]
        }
    }
}
</script>
