<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="rewriterulesets"
            row-key="id"
            resource="rewriterulesets"
            resource-type="api"
            :use-api-v2="true"
            :resource-path="`rewrite-rules/sets`"
            :resource-singular="$t('Rewrite Rule Set')"
            :title="$t('Rewrite Rule Sets')"
            :columns="columns"
            :searchable="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'rewriteRuleSetCreate'}
            ]"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
            :deletable="true"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="rowActions"
            deletion-subject="id"
            :deletion-text="'You are about to delete {resource} {subject}'"
            :show-header="false"
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
    name: 'AuiRewriteRuleSetsList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    data () {
        return {
        }
    },
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                this.getResellerNameColumn(),
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left',
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
                    component: 'input',
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = row.id
            return route
        },
        rowActions () {
            return [
                'rewriteRuleSetsEdit',
                'rewriteRuleSetRules',
                'rewriteRuleSetClone'
            ]
        }
    }
}
</script>
