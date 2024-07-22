<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberHeaderRulesContext && subscriberContext"
            ref="headerrulesconditions"
            table-id="headerrulesconditions"
            row-key="id"
            resource="headerrulesconditions"
            :resource-path="`header-manipulations/sets/${subscriberHeaderRulesContext.set_id}/rules/${subscriberHeaderRulesContext.id}/conditions`"
            :use-api-v2="true"
            :resource-singular="$t('Header Rule Conditions')"
            title=""
            :columns="columns"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'subscriberHeaderRulesConditionsCreate' }
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
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsHeaderManipulationsRulesConditionsList',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberHeaderRulesContextMixin,
        subscriberContextMixin
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
            if (_.includes(['subscriberHeaderRulesConditionsEdit'], route?.name)) {
                route.params.id = this.subscriberContext?.id
                route.params.headeruleId = this.subscriberHeaderRulesContext.id
                route.params.headeruleconditionsId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'subscriberHeaderRulesConditionsEdit'
            ]
        }
    }
}
</script>
