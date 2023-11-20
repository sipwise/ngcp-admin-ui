import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleSetContextContext () {
            return this.getDataContextObject('headerRuleSetContext')
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
