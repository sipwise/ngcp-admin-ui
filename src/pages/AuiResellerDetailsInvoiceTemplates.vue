<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="invoicetemplates"
            row-key="id"
            resource="invoicetemplates"
            resource-search-field="name"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-type="api"
            :resource-singular="$t('Invoice Template')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsInvoiceTemplateCreation' }]"
            :deletable="true"
            deletion-action="resellers/ajaxDeleteInvoiceTemplate"
            deletion-subject="name"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiResellerDetailsInvoiceTemplates',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    data () {
        return {
        }
    },
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
                    align: 'center'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'invoiceTemplateEditInfo',
                'invoiceTemplateEditContent'
            ]
        }
    }
}
</script>
