<template>
    <aui-base-sub-context
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
            :row-actions="rowActions"
            :row-menu-route-intercept="({ route, row }) => {
                route.params.id = row['id']
                return route
            }"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    data-cy="lnp-carriers-list-download-csv"
                    :disable="$waitPage($wait)"
                    @click.stop="handleDownloadCsv()"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    data-cy="lnp-carriers-list-upload-csv"
                    :to="{ name: 'lnpUpload' }"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>
<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpCarriersList',
    components: {
        AuiDataTable,
        AuiBaseSubContext,
        AuiListAction
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
            downloadLnpCsv: WAIT_PAGE
        }),
        rowActions () {
            return [
                'lnpCarrierEdit',
                'lnpCarrierNumbersList'
            ]
        },
        async handleDownloadCsv () {
            return this.downloadLnpCsv()
        }
    }
}
</script>
