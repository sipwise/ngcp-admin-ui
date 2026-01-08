<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="phonebook"
            row-key="id"
            resource="subscriberphonebookentries"
            :resource-path="`subscribers/${subscriberContextResourceId}/phonebook`"
            :resource-default-filters="() => {
                return {
                    include: 'customer',
                }
            }"
            resource-search-field="name"
            :use-api-v2="true"
            :resource-search-wildcard="true"
            resource-type="api"
            :resource-singular="$t('Phonebook Entry')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :row-editable="(row) => row && !isLevelEntry(row.id)"
            :addable="true"
            :add-action-routes="[{ name: 'subscriberDetailsPhonebookEntryCreation' }]"
            :deletable="true"
            :row-deletable="(row) => row && !isLevelEntry(row.id)"
            deletion-subject="name"
            :show-header="false"
            :show-more-menu="true"
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
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$wait.is(downloadWaitIdentifier)"
                    @click.stop="downloadCSV"
                />
                <aui-list-action
                    v-if="canUpload"
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'subscriberDetailsPhonebookEntryUploadCSV', params: {
                        id: subscriberContext.id
                    }}"
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
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTablePhonebook from 'src/mixins/data-table-phonebook'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscribersDetailsPhonebook',
    components: {
        AuiListAction,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTablePhonebook,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                this.nameColumn,
                this.numberColumn,
                this.sharedColumn
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
        ...mapWaitingActions('subscribers', {
            downloadPhonebookCSV: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.phonebookId = row.id
            return route
        },
        async downloadCSV () {
            await this.downloadPhonebookCSV(this.subscriberContext.id)
        },
        rowActions ({ row }) {
            if (row && this.isLevelEntry(row.id)) {
                return []
            }
            return [
                'subscriberDetailsPhonebookEntryEdit'
            ]
        },
        isLevelEntry (id) {
            // Entries with composite Ids are considered "level entries", must not be modified (no edit or delete allowed)
            return /[a-z]/.test(id)
        }
    }
}
</script>
