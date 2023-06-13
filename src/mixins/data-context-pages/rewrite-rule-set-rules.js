import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        rewriteRuleSetRulesContext () {
            return this.getDataContextObject('rewriteRuleSetRulesContext')
        },
        rewriteRuleSetRulesContextId () {
            return this.$route.params.rewriteRuleId
        }
    },
    methods: {
        async reloadRewriteRuleSetRulesContext () {
            await this.reloadDataContext('rewriteRuleSetRulesContext')
        }
    }
}
