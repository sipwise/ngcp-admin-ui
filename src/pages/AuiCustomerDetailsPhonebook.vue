<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
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
            :editable="false"
            :addable="false"
            :deletable="false"
            :row-deletable="() => true"
            deletion-subject="name"
            :show-header="true"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
        />
        <portal
            to="page-toolbar-left"
        >
            <aui-add-button
                class="q-mx-sm"
                :disable="!createItemRoute"
                :to="createItemRoute"
            />
            <q-btn
                class="q-mx-sm"
                icon="fas fa-download"
                color="primary"
                size="sm"
                :label="$t('Download CSV')"
                unelevated
                :disable="$wait.is(downloadWaitIdentifier)"
                @click="downloadCSV"
            />
            <q-btn
                class="q-mx-sm"
                icon="fas fa-upload"
                color="primary"
                size="sm"
                :label="$t('Upload CSV')"
                unelevated
                :to="uploadItemRoute"
            />
        </portal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiDataTable from 'components/AuiDataTable'
import AuiAddButton from 'components/buttons/AuiAddButton'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiCustomerDetailsPhonebook',
    components: {
        AuiDataTable,
        AuiAddButton
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        createItemRoute () {
            const customerId = this.resourceObject?.id
            if (customerId) {
                return { name: 'phonebookEntryCustomerCreate', params: { customerId: customerId } }
            } else {
                return null
            }
        },
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
