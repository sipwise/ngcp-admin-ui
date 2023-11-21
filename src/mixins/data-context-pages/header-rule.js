import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleSetContextContext () {
            return this.getDataContextObject('headerRuleSetContext')
        },
        headerRulesContextId () {
            return this.$route.params.headeruleId
        },
        headerRuleSetContextExpand () {
            return [
                'reseller_id'
            ]
        }
    },
    methods: {
        async reloadHeaderRuleSetContextContext () {
            await this.reloadDataContext('headerRuleSetContext')
        }
    }
}
