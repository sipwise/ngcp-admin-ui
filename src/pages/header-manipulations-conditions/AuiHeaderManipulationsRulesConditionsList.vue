<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRulesContext"
            ref="dataTable"
            table-id="headerruleconditions"
            row-key="id"
            resource="headerruleconditions"
            resource-type="api"
            :resource-default-filters="() => ({
                rule_id: headerRulesContext.id
            })"
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
                { name: 'headerRulesConditionsCreate'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
import { required } from '@vuelidate/validators'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesConditionsList',
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
                    name: 'match_type',
                    label: this.$t('Match'),
                    field: 'match_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchType
                },
                {
                    name: 'match_part',
                    label: this.$t('Part'),
                    field: 'match_part',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'match_name',
                    label: this.$t('Name'),
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
                    label: this.$t('Expression'),
                    field: 'expression',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.expression
                },
                {
                    name: 'value_type',
                    label: this.$t('Type'),
                    field: 'value_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.valueType
                },
                {
                    name: 'values',
                    label: this.$t('Values'),
                    field: 'values',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['headerRulesConditionsEdit'], route?.name)) {
                route.params.id = this.headerRuleSetContext.id
                route.params.headerruleId = this.headerRulesContext.id
                route.params.headerulecondtionsId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'headerRulesConditionsEdit'
            ]
        }
    }
}
</script>
