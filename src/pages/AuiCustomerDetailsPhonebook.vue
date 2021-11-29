<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="phonebook"
            row-key="id"
            resource="phonebookentries"
            resource-search-field="name"
            :resource-default-filters="() => ({ customer_id: resourceObject.id })"
            resource-base-path="phonebook"
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
                    :to="uploadItemRoute"
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
export default {
    name: 'AuiCustomerDetailsPhonebook',
    components: {
        AuiListAction,
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
        uploadItemRoute () {
            const customerId = this.resourceObject?.id
            if (customerId) {
                return { name: 'phonebookEntryCustomerUploadCSV', params: { customerId: customerId } }
            } else {
                return null
            }
        },
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
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'number',
                    label: this.$t('Number'),
                    field: 'number',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'phonebookEntryCustomerEdit'
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
            const customerId = this.resourceObject?.id
            if (route?.name === 'phonebookEntryCustomerEdit') {
                route.params.customerId = customerId
            }
            return route
        },
        async downloadCSV () {
            const customerId = this.resourceObject?.id
            if (customerId) {
                await this.ajaxDownloadPhonebookCSV(customerId)
            }
        }
    }
}
</script>
