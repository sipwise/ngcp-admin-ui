<template>
    <aui-base-sub-context
        @refresh="refresh"
    >
        <aui-data-table
            v-if="resourceObject"
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
                    carrier_id: resourceObject.id
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
            :row-menu-route-intercept="({ route, row }) => {
                route.params.id = row.carrier_id
                route.params.numberId = row['id']
                return route
            }"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
import { mapState } from 'vuex'
import { numeric, required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiLnpNumberList',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subContext
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
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
        rowActions () {
            return [
                'lnpNumberEdit'
            ]
        }
    }
}
</script>
