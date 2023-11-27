<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRulesContext"
            ref="dataTable"
            table-id="headerruleactions"
            row-key="id"
            resource="headerruleactions"
            resource-type="api"
            :resource-default-filters="() => ({
                rule_id: headerRulesContext.id
            })"
            :resource-singular="$t('Header Rule Actions')"
            title=""
            :columns="columns"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRulesActionsCreate'}
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
import { numeric, required } from '@vuelidate/validators'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesActionsList',
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
            'matchPart',
            'actionType'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
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
                    name: 'header',
                    label: this.$t('Header'),
                    field: 'header',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Header must not be empty')
                        }
                    ]
                },
                {
                    name: 'header_part',
                    label: this.$t('Part'),
                    field: 'header_part',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'action_type',
                    label: this.$t('Type'),
                    field: 'action_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.actionType
                },
                {
                    name: 'value_part',
                    label: this.$t('Value Part'),
                    field: 'value_part',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'value',
                    label: this.$t('Value'),
                    field: 'value',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'rwr_set_id',
                    label: this.$t('Rewrite Rules Set'),
                    field: 'rwr_set_id_expand.name',
                    expand: 'rwr_set_id',
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
            if (_.includes(['headerRulesActionsEdit'], route?.name)) {
                route.params.id = this.headerRuleSetContext.id
                route.params.headerruleId = this.headerRulesContext.id
                route.params.headeruleactionsId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'headerRulesActionsEdit'
            ]
        }
    }
}
</script>
