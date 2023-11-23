import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        headerRuleSetContext () {
            return this.getDataContextObject('headerRuleSetContext')
        },
        headerRulesContextId () {
            return 'headerRuleSetRulesContext'
        },
        headerRulesContextResourceId () {
            return this.$route.params.headeruleId
        },
        headerRuleSetContextExpand () {
            return [
                'reseller_id'
            ]
        },
        headerRulesContextResource () {
            return 'headerrules'
        },
        headerRulesContext () {
            return this.getDataContextObject(this.headerRulesContextId)
        },
        headerRulesContextResourceFilters () {
            return {
                set_id: this.$route.params.id
            }
        }
    },
    methods: {
        async loadHeaderRulesContext () {
            await this.loadDataContext({
                resourceObjectId: this.headerRulesContextId,
                resource: this.headerRulesContextResource,
                resourceId: this.headerRulesContextResourceId,
                resourceFilters: this.headerRulesContextResourceFilters
            })
        },
        async reloadHeaderRulesContext () {
            await this.reloadDataContext(this.headerRulesContextId)
        },
        async reloadHeaderRuleSetContext () {
            await this.reloadDataContext('headerRuleSetContext')
        }
    }
}
