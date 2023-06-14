import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        rewriteRuleSetContext () {
            return this.getDataContextObject('rewriteRuleSetContext')
        },
        rewriteRuleSetExpand () {
            return [
                'reseller_id'
            ]
        }
    },
    methods: {
        async reloadRewriteRuleSetContext () {
            await this.reloadDataContext('rewriteRuleSetContext')
        }
    }
}
