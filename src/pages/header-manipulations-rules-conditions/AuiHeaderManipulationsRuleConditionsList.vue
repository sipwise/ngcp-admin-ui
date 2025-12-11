<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRuleContext"
            ref="dataTable"
            table-id="headerruleconditions"
            row-key="id"
            resource="headerruleconditions"
            :resource-path="`header-manipulations/sets/${headerSetContextResourceId}/rules/${headerRuleContextResourceId}/conditions`"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="$t('Header Rule Conditions')"
            title=""
            :columns="columns"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRuleConditionCreate'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiHeaderManipulationsRuleConditionsList',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        headerRuleSetContextMixin
    ],
    computed: {
        ...mapGetters('headerRuleSets', [
            'matchType',
            'matchPart',
            'expression',
            'valueType'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'match_type',
                    label: this.$t('Match Type'),
                    field: 'match_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchType
                },
                {
                    name: 'match_part',
                    label: this.$t('Match Part'),
                    field: 'match_part',
                    sortable: true,
                    align: 'left',
                    editable: (data) => data.row.match_type !== 'preference',
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'match_name',
                    label: this.$t('Match Name'),
                    field: 'match_name',
                    sortable: true,
                    align: 'left',
                    editable: true,
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
                    name: 'expression',
                    label: this.$t('Operator'),
                    field: 'expression',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.expression
                },
                {
                    name: 'value_type',
                    label: this.$t('Value Type'),
                    field: 'value_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.valueType
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (['headerRuleConditionEdit'].includes(route?.name)) {
                route.params.id = this.headerSetContextResourceId
                route.params.headerRuleId = this.headerRuleContextResourceId
                route.params.headerRuleConditionId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'headerRuleConditionEdit'
            ]
        }
    }
}
</script>
