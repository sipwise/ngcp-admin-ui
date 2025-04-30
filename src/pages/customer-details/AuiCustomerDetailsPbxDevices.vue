<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="customerContext"
            table-id="pbxdevices"
            row-key="id"
            resource="pbxdevices"
            resource-search-field="station_name"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({
                customer_id: customerContext.id,
                expand: 'profile_id'
            })"
            resource-type="api"
            :resource-singular="$t('Pbx Device')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerDetailsPbxDeviceCreation' }]"
            :deletable="true"
            deletion-subject="station_name"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :search-criteria-config="[
                {
                    criteria: 'station_name',
                    label: $t('Station Name'),
                    component: 'input'
                },
                {
                    criteria: 'identifier',
                    label: $t('Identifier'),
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
export default {
    name: 'AuiCustomerDetailsPbxDevices',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [
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
                    align: 'left'
                },
                {
                    name: 'station_name',
                    label: this.$t('Station Name'),
                    field: 'station_name',
                    sortable: true,
                    editable: true,
                    align: 'left',
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
                    name: 'identifier',
                    label: this.$t('MAC Address / Identifier'),
                    field: 'identifier',
                    sortable: true,
                    editable: true,
                    align: 'left',
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
                    name: 'profile',
                    label: this.$t('Device Profile'),
                    field: 'profile_id_expand.name',
                    expand: 'profile_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.customerContext.id
            route.params.pbxDeviceId = row.id
            route.params.identifier = row.identifier
            return route
        },
        rowActions () {
            return [
                'customerDetailsPbxDeviceEdit',
                'customerDetailsPbxDeviceConfig',
                'customerDetailsPbxDevicePreferences'
            ]
        }
    }
}
</script>
