<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="lnpcarriers"
            row-key="id"
            resource="lnpcarriers"
            resource-base-path="lnpcarriers"
            resource-type="api"
            :resource-singular="$t('LNP Carrier')"
            :title="$t('LNP Carriers')"
            :columns="columns"
            :deletable="true"
            :searchable="true"
            :addable="true"
            :editable="true"
            :show-header="false"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                },
                {
                    criteria: 'prefix',
                    label: $t('Prefix'),
                    component: 'input'
                }
            ]"
            deletion-subject="id"
            :add-action-routes="[
                { name: 'lnpCarrierCreation'}
            ]"
            :row-menu-route-names="[
                'lnpCarrierEdit',
                'lnpNumberList'
            ]"
            :row-menu-route-intercept="({ route, row }) => {
                route.params.id = row['id']
                return route
            }"
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
                    :to="{ name: 'lnpCarrierUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>
<script>
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiListAction from 'components/AuiListAction'
import { required } from 'vuelidate/lib/validators'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiLnpCarrierList',
    components: {
        AuiListAction,
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        }
                    ]
                },
                {
                    name: 'prefix',
                    label: this.$t('Prefix'),
                    field: 'prefix',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        }
                    ]
                },
                {
                    name: 'authoritative',
                    label: this.$t('Authoritative'),
                    field: 'authoritative',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'skip_rewrite',
                    label: this.$t('Skip Rewrite'),
                    field: 'skip_rewrite',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('lnp', {
            downloadCsv: WAIT_PAGE
        })
    }
}
</script>