<template>
    <aui-base-sub-context
        @refresh="refresh"
    >
        <aui-data-table
            v-if="lnpCarrierContext"
            ref="dataTable"
            table-id="lnpnumbers"
            row-key="id"
            resource="lnpnumbers"
            resource-base-path="lnpnumbers"
            resource-type="api"
            :resource-singular="$t('LNP Number')"
            :title="$t('LNP Numbers')"
            :columns="columns"
            :deletable="true"
            :searchable="true"
            :addable="true"
            :editable="true"
            :show-header="false"
            resource-search-field="number"
            :resource-search-wildcard="true"
            :resource-default-filters="() => {
                return {
                    carrier_id: lnpCarrierContext.id
                }
            }"
            :search-criteria-config="[
                {
                    criteria: 'number',
                    label: $t('Number'),
                    component: 'input'
                },
                {
                    criteria: 'carrier_id',
                    label: $t('Carrier'),
                    component: 'input'
                }
            ]"
            deletion-subject="id"
            :add-action-routes="[
                { name: 'lnpNumberCreation'}
            ]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-mx-xs"
                    icon="fas fa-download"
                    :label="$t('Download CSV')"
                    :disable="$waitPage($wait)"
                    @click.stop="functionNumber()"
                />
                <aui-list-action
                    icon="fas fa-upload"
                    :label="$t('Upload CSV')"
                    :to="{ name: 'lnpNumberUpload'}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
import { numeric, required } from '@vuelidate/validators'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiLnpNumberList',
    components: {
        AuiDataTable,
        AuiBaseSubContext,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subContext,
        lnpCarrierContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'number',
                    label: this.$t('Number'),
                    field: 'number',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        },
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Number must be a valid E164 number')
                        }
                    ]
                },
                {
                    name: 'routing_number',
                    label: this.$t('Routing Number'),
                    field: 'routing_number',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'start',
                    label: this.$t('Start Date'),
                    field: 'start',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'end',
                    label: this.$t('End Date'),
                    field: 'end',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('lnp', {
            downloadLnpNumber: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['lnpNumberEdit'], route?.name)) {
                route.params.id = this.lnpCarrierContext.id
                route.params.numberId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'lnpNumberEdit'
            ]
        },
        async functionNumber () {
            await this.downloadLnpNumber(this.lnpCarrierContext.id)
        }
    }
}
</script>
