<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            :title="$t('Phonebooks Entry')"
            table-id="phonebookentries"
            resource="phonebookentries"
            :resource-type="resourceType"
            resource-alt="phonebook/ajax"
            resource-base-path="phonebook"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-singular="$t('Phonebook Entry')"
            :show-header="false"
            :columns="columns"
            :addable="true"
            :editable="true"
            :deletable="true"
            :searchable="true"
            deletion-subject="name"
            :add-action-routes="[{ name: 'phonebookEntryCreation' }]"
            deletion-action="dataTable/ajaxDelete"
            :row-actions="rowActions"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-ml-sm"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$waitPage()"
                    @click="downloadCsv"
                />
                <aui-list-action
                    class="q-ml-sm"
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'phonebookUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>
<script>
// Todo: Switch from ajax to api
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTablePhonebook from 'src/mixins/data-table-phonebook'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import AuiListAction from 'components/AuiListAction'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiPhonebookEntryList',
    components: {
        AuiListAction,
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTablePhonebook,
        dataTableColumn,
        dataTable
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                this.getResellerNameColumn(this.resourceType),
                this.nameColumn,
                this.numberColumn
            ]
        },
        resourceType () {
            return 'ajax'
        }
    },
    methods: {
        ...mapWaitingActions('phonebookEntries', {
            downloadCsv: WAIT_PAGE
        }),
        rowActions () {
            return [
                'phonebookEntryEdit'
            ]
        }
    }
}
</script>
