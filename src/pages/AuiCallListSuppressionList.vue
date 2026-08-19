<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="calllistsuppressions"
            row-key="id"
            resource="calllistsuppressions"
            resource-base-path="calllistsuppression"
            resource-type="api"
            :resource-singular="$t('Call List Suppression')"
            :title="$t('Global Call List Suppressions')"
            :columns="columns"
            :searchable="true"
            :resource-search-wildcard="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'callListSuppressionCreation'}
            ]"
            :deletable="true"
            :row-actions="rowActions"
            deletion-subject="id"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                },
                {
                    criteria: 'direction',
                    label: $t('Direction'),
                    component: 'input'
                },
                {
                    criteria: 'mode',
                    label: $t('Mode'),
                    component: 'input'
                },
                {
                    criteria: 'pattern',
                    label: $t('Pattern'),
                    component: 'input'
                },
                {
                    criteria: 'label',
                    label: $t('Label'),
                    component: 'input'
                }
            ]"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$waitPage($wait)"
                    @click.stop="downloadCsv"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'callListSuppressionUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { WAIT_PAGE } from 'src/constants'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCallListSuppressionList',
    components: {
        AuiBaseListPage,
        AuiDataTable,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                this.getDomainColumn(),
                {
                    name: 'direction',
                    label: this.$t('Direction'),
                    field: 'direction',
                    sortable: true,
                    align: 'left',
                    editable: false,
                    component: 'select',
                    componentOptions: [
                        {
                            value: 'outgoing',
                            label: this.$t('Outgoing')
                        },
                        {
                            value: 'incoming',
                            label: this.$t('Incoming')
                        }
                    ]
                },
                {
                    name: 'pattern',
                    label: this.$t('Pattern'),
                    field: 'pattern',
                    sortable: true,
                    align: 'left',
                    editable: false,
                    component: 'input'
                },
                {
                    name: 'mode',
                    label: this.$t('Mode'),
                    field: 'mode',
                    sortable: true,
                    align: 'left',
                    editable: false,
                    component: 'input'
                },
                {
                    name: 'label',
                    label: this.$t('Label'),
                    field: 'label',
                    sortable: true,
                    align: 'left',
                    editable: false,
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('callListSuppressions', {
            downloadCsv: WAIT_PAGE
        }),
        rowActions () {
            return [
                'callListSuppressionEdit'
            ]
        }
    }
}
</script>
