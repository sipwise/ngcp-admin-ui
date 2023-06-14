import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        rewriteRuleContext () {
            return this.getDataContextObject('rewriteRulesContext')
        },
        rewriteRuleContextId () {
            return this.$route.params.rewriteRuleId
        }
    },
    methods: {
        async reloadRewriteRuleContext () {
            await this.reloadDataContext('rewriteRulesContext')
        }
    }
}
