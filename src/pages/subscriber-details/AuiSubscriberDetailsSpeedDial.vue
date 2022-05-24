<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="dataTable"
            table-id="speeddial"
            row-key="id"
            resource="speeddial"
            :resource-alt="tableResourcePath"
            resource-type="ajax"
            :resource-singular="$t('Speed Dial')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'subscriberDetailsSpeedDialCreation'}
            ]"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :deletable="true"
            deletion-subject="id"
            :resource-default-filters="({ operation }) => { if (operation === 'delete') { return { subscriberId: resourceObject.id } }}"
            deletion-action="subscribers/ajaxDeleteSpeedDial"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subContext from 'src/mixins/sub-context'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiSubscriberDetailsSpeedDial',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subContext
    ],
    computed: {
        tableResourcePath () {
            return `subscriber/${this.resourceObject.id}/preferences/speeddial/ajax`
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'slot',
                    label: this.$t('Slot'),
                    field: 'slot',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'destination',
                    label: this.$t('Destination'),
                    field: 'destination',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.resourceObject.id
            route.params.speedDialId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsSpeedDialEdit'
            ]
        }
    }
}
</script>
