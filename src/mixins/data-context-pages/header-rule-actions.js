import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleActionContext () {
            return this.getDataContextObject('headerRuleActionContext')
        },
        subscriberHeaderRuleActionContext () {
            return this.getDataContextObject('subscriberHeaderRuleActionContext')
        },
        headerRuleActionContextResourceId () {
            return this.$route.params.headerRuleActionId
        },
        headerRuleActionContextExpand () {
            return [
                'rwr_set_id'
            ]
        },
        headerRuleActionContextRewriteRules () {
            return this.headerRuleActionContext?.rwr_set_id_expand
        },
        subscriberHeaderRuleActionContextRewriteRules () {
            return this.subscriberHeaderRuleActionContext?.rwr_set_id_expand
        },
        subscriberHeaderRuleActionContextId () {
            return this.subscriberHeaderRuleActionContext?.id
        }
    },
    methods: {
        async reloadHeaderRuleActionContext () {
            await this.reloadDataContext('headerRuleActionContext')
        },
        async reloadSubscriberHeaderRuleActionContext () {
            await this.reloadDataContext('subscriberHeaderRuleActionContext')
        }
    }
}
