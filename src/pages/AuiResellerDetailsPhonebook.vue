<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
            table-id="phonebook"
            row-key="id"
            resource="phonebookentries"
            resource-search-field="name"
            :resource-default-filters="() => ({ reseller_id: resourceObject.id })"
            resource-base-path="phonebook"
            resource-type="api"
            :resource-singular="$t('Phonebook Entry')"
            :resource-plural="$t('Phonebook Entries')"
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
    name: 'AuiResellerDetailsPhonebook',
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
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                return { name: 'phonebookEntryResellerCreate', params: { resellerId: resellerId } }
            } else {
                return null
            }
        },
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
