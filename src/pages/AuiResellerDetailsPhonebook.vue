<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="phonebook"
            row-key="id"
            resource="phonebookentries"
            resource-search-field="name"
            :resource-default-filters="() => ({ reseller_id: resourceObject.id })"
            resource-type="api"
            :resource-singular="$t('Phonebook Entry')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsPhonebookEntryCreation' }]"
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
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiResellerDetailsPhonebook',
    components: {
        AuiBaseSubContext,
        AuiListAction,
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
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                return { name: 'phonebookEntryResellerUploadCSV', params: { resellerId: resellerId } }
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
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'number',
                    label: this.$t('Number'),
                    field: 'number',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'phonebookEntryResellerEdit'
            ]
        },
        downloadWaitIdentifier () {
            return WAIT_PAGE
        }
    },
    methods: {
        ...mapWaitingActions('resellers', {
            ajaxDownloadPhonebookCSV: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            const resellerId = this.resourceObject?.id
            if (route?.name === 'phonebookEntryResellerEdit') {
                route.params.resellerId = resellerId
            }
            return route
        },
        async downloadCSV () {
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                await this.ajaxDownloadPhonebookCSV(resellerId)
            }
        }
    }
}
</script>
