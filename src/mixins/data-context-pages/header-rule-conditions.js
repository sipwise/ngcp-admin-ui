import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleConditionContext () {
            return this.getDataContextObject('headerRuleConditionContext')
        },
        subscriberHeaderRuleConditionContext () {
            return this.getDataContextObject('subscriberHeaderRuleConditionContext')
        },
        headerRuleConditionContextResourceId () {
            return this.$route.params.headerRuleConditionId
        },
        subscriberHeaderRuleConditionContextId () {
            return this.$route.params.headerRuleConditionId
        },
        headerRuleConditionContextExpand () {
            return [
                'rwr_set_id'
            ]
        },
        headerRuleConditionContextRewriteRules () {
            return this.headerRuleConditionContext?.rwr_set_id_expand
        },
        subscriberHeaderRuleConditionContextRewriteRules () {
            return this.subscriberHeaderRuleConditionContext?.rwr_set_id_expand
        }
    },
    methods: {
        async reloadHeaderRuleConditionContext () {
            await this.reloadDataContext('headerRuleConditionContext')
        },
        async reloadSubscriberHeaderRuleConditionContext () {
            await this.reloadDataContext('subscriberHeaderRuleConditionContext')
        }
    }
}
