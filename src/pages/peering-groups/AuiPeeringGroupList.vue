<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="peering"
            row-key="id"
            resource="peeringgroups"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="api"
            resource-alt="peeringgroupset"
            :resource-singular="$t('SIP Peering Groups')"
            :title="$t('SIP Peering Groups')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'peeringGroupCreation'}]"
            :deletable="true"
            :show-header="false"
            :deletion-label="$t('Delete')"
            :deletion-text="$t('You are about to delete SIP Peering Groups # {subject}')"
            deletion-subject="id"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiPeeringGroupsList',
    components: {
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTableColumn,
        dataTable
    ],
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters('peering', [
            'peeringPriorityOptions'
        ]),
        columns () {
            return [
                this.idColumn,
                {
                    name: 'contact_email',
                    label: this.$t('Contact Email'),
                    field: 'contract_id_expand.contact_id_expand.email',
                    expand: 'contract_id.contact_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
                    sortable: true,
                    editable: true,
                    component: 'select',
                    componentOptions: this.peeringPriorityOptions,
                    align: 'left',
                    displayValue: true
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'time_set_id',
                    label: this.$t('Time Set ID'),
                    field: 'time_set_id',
                    sortable: true,
                    align: 'left',
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'peeringGroupEdit',
                'peeringGroupDetails'
            ]
        }
    }
}
</script>
