<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="header"
            row-key="id"
            resource="headerrulesets"
            :resource-path="`header-manipulations/sets`"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="$t('Header Manipulations')"
            :title="$t('Header Manipulations')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'headerSetCreation'}]"
            :deletable="true"
            :show-header="false"
            :deletion-label="$t('Delete')"
            deletion-subject="id"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>
<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiHeaderManipulationList',
    components: {
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTableColumn,
        dataTable
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                this.getResellerNameColumn(),
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    component: 'input',
                    editable: true,
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
                    align: 'left',
                    component: 'input',
                    editable: true
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'headerSetEdit',
                'headerRules'
            ]
        }
    }
}
</script>
