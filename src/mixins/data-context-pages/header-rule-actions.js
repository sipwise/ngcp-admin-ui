import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleActionsContext () {
            return this.getDataContextObject('headerRuleActionContext')
        },
        subscriberHeaderRulesActionsContext () {
            return this.getDataContextObject('subscriberHeaderRulesActionsContext')
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
        subscriberHeaderRuleActionsContextRewriteRules () {
            return this.subscriberHeaderRulesActionsContext?.rwr_set_id_expand
        },
        subscriberHeaderRuleActionsContextId () {
            return this.subscriberHeaderRulesActionsContext?.id
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
        },
        async reloadSubscriberHeaderRulesActionsContext () {
            await this.reloadDataContext('subscriberHeaderRulesActionsContext')
        }
    }
}
