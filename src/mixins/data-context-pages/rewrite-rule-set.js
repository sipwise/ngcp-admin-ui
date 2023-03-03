import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        rewriteRuleSetContextId () {
            return 'rewriteRuleSetContext'
        },
        rewriteRuleSetContextResource () {
            return 'rewriterulesets'
        },
        rewriteRuleSetContextResourceId () {
            return this.$route.params.id
        },
        rewriteRuleSetContext () {
            return this.getDataContextObject(this.rewriteRuleSetContextId)
        },
        rewriteRuleSetExpand () {
            return [
                'reseller_id'
            ]
        }
    },
    methods: {
        async reloadRewriteRuleSetContext () {
            await this.reloadDataContext(this.rewriteRuleSetContextId)
        }
    }
}
