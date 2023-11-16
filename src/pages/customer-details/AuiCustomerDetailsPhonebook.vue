<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="customerContext"
            table-id="phonebook"
            row-key="id"
            resource="phonebookentries"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({
                customer_id: customerContext.id
            })"
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
            :row-actions="rowActions"
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
                    @click.stop="downloadCSV"
                />
                <aui-list-action
                    class="q-ml-sm"
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'customerDetailsPhonebookEntryUploadCSV', params: { id: customerContext.id }}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import { mapWaitingActions } from 'vue-wait'
import AuiDataTable from 'components/AuiDataTable'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiListAction from 'components/AuiListAction'
import dataTablePhonebook from 'src/mixins/data-table-phonebook'
import dataTableColumn from 'src/mixins/data-table-column'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsPhonebook',
    components: {
        AuiListAction,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTablePhonebook,
        dataTableColumn,
        customerContextMixin
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                this.nameColumn,
                this.numberColumn
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
            route.params.id = this.customerContext.id
            route.params.phonebookId = row.id
            return route
        },
        async downloadCSV () {
            await this.ajaxDownloadPhonebookCSV(this.customerContext.id)
        },
        rowActions () {
            return [
                'customerDetailsPhonebookEntryEdit'
            ]
        }
    }
}
</script>
