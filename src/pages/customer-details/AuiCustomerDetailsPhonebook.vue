<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="phonebook"
            row-key="id"
            resource="phonebookentries"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({ customer_id: resourceObject.id })"
            resource-type="api"
            :resource-singular="$t('Phonebook Entry')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerDetailsPhonebookEntryCreation' }]"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :search-criteria-config="[
                {
                    criteria: 'number',
                    label: $t('Number'),
                    component: 'input'
                },
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-ml-sm"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$wait.is(downloadWaitIdentifier)"
                    @click="downloadCSV"
                />
                <aui-list-action
                    class="q-ml-sm"
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'customerDetailsPhonebookEntryUploadCSV', params: { id: resourceObject.id }}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiDataTable from 'components/AuiDataTable'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiListAction from 'components/AuiListAction'
import dataTablePhonebook from 'src/mixins/data-table-phonebook'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiCustomerDetailsPhonebook',
    components: {
        AuiListAction,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTablePhonebook,
        dataTableColumn
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        columns () {
            return [
                this.idColumn,
                this.nameColumn,
                this.numberColumn
            ]
        },
        rowActionRouteNames () {
            return [
                'customerDetailsPhonebookEntryEdit'
            ]
        },
        downloadWaitIdentifier () {
            return WAIT_PAGE
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            ajaxDownloadPhonebookCSV: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.resourceObject.id
            route.params.phonebookId = row.id
            return route
        },
        async downloadCSV () {
            await this.ajaxDownloadPhonebookCSV(this.resourceObject.id)
        }
    }
}
</script>
