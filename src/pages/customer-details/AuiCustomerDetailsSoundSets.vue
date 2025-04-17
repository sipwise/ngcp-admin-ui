<template>
    <aui-base-sub-context
        @refresh="refresh"
    >
        <aui-data-table
            v-if="customerContext"
            ref="dataTable"
            table-id="soundsets"
            resource="soundsets"
            resource-base-path="soundset"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="api"
            :resource-default-filters="() => {
                return {
                    customer_id: customerContext.id
                }
            }"
            :resource-singular="$t('Sound Sets')"
            row-key="id"
            :title="$t('Sound Sets')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :add-action-routes="[{ name: 'customerDetailsSoundSetCreation'}]"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="() => {
                return [
                    'customerDetailsSoundSetEdit',
                    'customerDetailsSoundSetHandles',
                    'customerDetailsSoundSetDefault'
                ]}"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiCustomerDetailsSoundSets',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        customerContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'parent_name',
                    label: this.$t('Parent'),
                    field: 'parent_name',
                    sortable: true,
                    editable: false,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'expose_to_customer',
                    label: this.$t('Expose to Customer'),
                    field: 'expose_to_customer',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.customerContext.id
            route.params.soundId = row.id
            return route
        }
    }
}
</script>
