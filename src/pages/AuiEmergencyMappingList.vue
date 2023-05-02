<template>
    <aui-base-sub-context
        @refresh="refresh"
    >
        <aui-data-table
            v-if="resourceObject"
            ref="dataTable"
            :title="$routeMeta.$label($route)"
            table-id="emergencymappings"
            resource="emergencymappings"
            resource-type="api"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="() => {
                return {
                    emergency_container_id: resourceObject.id
                }
            }"
            :resource-singular="$t('Emergency Mapping')"
            :columns="columns"
            :searchable="true"
            :addable="true"
            :add-action-routes="[{ name: 'emergencyMappingCreation' }]"
            :editable="true"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="({ route, row }) => {
                route.params.id = row.emergency_container_id
                route.params.mappingId = row.id
                return route
            }"
            :search-criteria-config="[
                {
                    criteria: 'code',
                    label: $t('Number'),
                    component: 'input'
                }
            ]"
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
import { numeric } from '@vuelidate/validators'
export default {
    name: 'AuiEmergencyMappingList',
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
                    name: 'code',
                    label: this.$t('Emergency Number'),
                    field: 'code',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Only digits are allowed')
                        }
                    ]
                },
                {
                    name: 'prefix',
                    label: this.$t('Emergency Prefix'),
                    field: 'prefix',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'suffix',
                    label: this.$t('Emergency Suffix'),
                    field: 'suffix',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'emergencyMappingEdit'
            ]
        }
    }
}
</script>
