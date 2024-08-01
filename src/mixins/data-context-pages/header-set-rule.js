import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerSetContext () {
            return this.getDataContextObject('headerSetContext')
        },
        headerRuleContext () {
            return this.getDataContextObject('headerRuleContext')
        },
        subscriberHeaderRuleContext () {
            return this.getDataContextObject('subscriberHeaderRuleContext')
        },
        headerSetContextResourceId () {
            return this.$route.params.id
        },
        headerRuleContextResourceId () {
            return this.$route.params.headerRuleId
        },
        headerSetContextExpand () {
            return [
                'reseller_id'
            ]
        },
        headerRuleContextReseller () {
            return this.headerSetContext?.reseller_id_expand?.id
        }
    },
    methods: {
        async reloadHeaderRuleContext () {
            await this.reloadDataContext('headerRuleContext')
        },
        async reloadHeaderSetContext () {
            await this.reloadDataContext('headerSetContext')
        },
        async reloadSubscriberHeaderRuleContext () {
            await this.reloadDataContext('subscriberHeaderRuleContext')
        }
    }
}
