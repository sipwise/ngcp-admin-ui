import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleActionsContext () {
            return this.getDataContextObject('headerRuleActionContext')
        },
        headerRuleActionContextId () {
            return 'headerRuleActionContext'
        },
        headerRulesActionsContextResourceId () {
            return this.$route.params.headeruleactionsId
        },
        headerRulesActionsContextResource () {
            return 'headerruleactions'
        },
        headerRuleActionsContextExpand () {
            return [
                'rwr_set_id'
            ]
        },
        headerRuleActionsContextRewriteRules () {
            return this.headerRuleActionsContext?.rwr_set_id_expand
        },
        headerRulesActionsContextResourceFilters () {
            return {
                rule_id: this.$route.params.headeruleId
            }
        }
    },
    methods: {
        async loadHeaderRulesConditionsContext () {
            await this.loadDataContext({
                resourceObjectId: this.headerRuleActionContextId,
                resource: this.headerRulesActionsContextResource,
                resourceId: this.headerRulesActionsContextResourceId,
                resourceFilters: this.headerRulesActionsContextResourceFilters
            })
        },
        async reloadHeaderRulesActionsContext () {
            await this.reloadDataContext(this.headerRuleActionContextId)
        }
    }
}
