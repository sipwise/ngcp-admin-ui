import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleConditionsContext () {
            return this.getDataContextObject('headerRuleConditionContext')
        },
        headerRuleConditionContextId () {
            return 'headerRuleConditionContext'
        },
        headerRulesConditionsContextResourceId () {
            return this.$route.params.headerulecondtionsId
        },
        subscriberHeaderRulesConditionsContext () {
            return this.getDataContextObject('subscriberHeaderRulesConditionsContext')
        },
        headerRulesConditionsContextResource () {
            return 'headerruleconditions'
        },
        headerRuleConditionsContextExpand () {
            return [
                'rwr_set_id'
            ]
        },
        headerRuleConditionsContextRewriteRules () {
            return this.headerRuleConditionsContext?.rwr_set_id_expand
        },
        headerRulesConditionsContextResourceFilters () {
            return {
                rule_id: this.$route.params.headeruleId
            }
        },
        subscriberHeaderRulesConditionsContextId () {
            return this.$route.params.headeruleconditionsId
        },
        subscriberHeaderRuleConditionsContextRewriteRules () {
            return this.subscriberHeaderRulesConditionsContext?.rwr_set_id_expand
        }
    },
    methods: {
        async loadHeaderRulesConditionsContext () {
            await this.loadDataContext({
                resourceObjectId: this.headerRuleConditionContextId,
                resource: this.headerRulesConditionsContextResource,
                resourceId: this.headerRulesConditionsContextResourceId,
                resourceFilters: this.headerRulesConditionsContextResourceFilters
            })
        },
        async reloadHeaderRulesConditionsContext () {
            await this.reloadDataContext(this.headerRuleConditionContextId)
        },
        async reloadSubscriberHeaderRulesConditionsContext () {
            await this.reloadDataContext('subscriberHeaderRulesConditionsContext')
        }
    }
}
