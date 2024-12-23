<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="phonebook"
            row-key="id"
            resource="resellerphonebookentries"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({ reseller_id: resourceObject.id })"
            resource-type="api"
            :resource-singular="$t('Phonebook Entry')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsPhonebookEntryCreation' }]"
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
                    v-if="canUpload"
                    class="q-ml-sm"
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'resellerDetailsPhonebookEntryUploadCSV', params: { id: resourceObject.id } }"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTablePhonebook from 'src/mixins/data-table-phonebook'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsPhonebook',
    components: {
        AuiBaseSubContext,
        AuiListAction,
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
        downloadWaitIdentifier () {
            return WAIT_PAGE
        },
        canUpload () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    methods: {
        ...mapWaitingActions('resellers', {
            ajaxDownloadPhonebookCSV: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.resourceObject.id
            route.params.phonebookId = row.id
            return route
        },
        async downloadCSV () {
            await this.ajaxDownloadPhonebookCSV(this.resourceObject.id)
        },
        rowActions () {
            return [
                'resellerDetailsPhonebookEntryEdit'
            ]
        }
    }
}
</script>
