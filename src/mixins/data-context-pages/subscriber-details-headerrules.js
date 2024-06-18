import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberHeaderRulesContextId () {
            return 'subscriberHeaderRulesContext'
        },
        subscriberHeaderRulesContextResource () {
            return 'headerrules'
        },
        subscriberHeaderRulesContextResourceId () {
            return this.$route.params.headerId
        },
        subscriberHeaderRulesContextResourceFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        },
        subscriberHeaderRulesContext () {
            return this.getDataContextObject(this.subscriberHeaderRulesContextId)
        }
    },
    methods: {
        async loadSubscriberHeaderRulesContext () {
            await this.loadDataContext({
                resourceObjectId: this.subscriberHeaderRulesContextId,
                resource: this.subscriberHeaderRulesContextResource,
                resourceId: this.subscriberHeaderRulesContextResourceId,
                resourceFilters: this.subscriberHeaderRulesContextResourceFilters
            })
        },
        async reloadSubscriberHeaderRulesContext () {
            await this.reloadDataContext(this.subscriberHeaderRulesContextId)
        }
    }
}
