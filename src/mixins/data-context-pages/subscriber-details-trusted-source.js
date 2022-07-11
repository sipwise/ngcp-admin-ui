import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberTrustedSourceContextId () {
            return 'subscriberTrustedSourceContext'
        },
        subscriberTrustedSourceContextResource () {
            return 'trustedsources'
        },
        subscriberTrustedSourceContextResourceId () {
            return this.$route.params.trustedSourceId
        },
        subscriberTrustedSourceContextResourceFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        },
        subscriberTrustedSourceContext () {
            return this.getDataContextObject(this.subscriberTrustedSourceContextId)
        }
    },
    methods: {
        async loadSubscriberTrustedSourceContext () {
            await this.loadDataContext({
                resourceObjectId: this.subscriberTrustedSourceContextId,
                resource: this.subscriberTrustedSourceContextResource,
                resourceId: this.subscriberTrustedSourceContextResourceId,
                resourceFilters: this.subscriberTrustedSourceContextResourceFilters
            })
        },
        async reloadSubscriberTrustedSourceContext () {
            await this.reloadDataContext(this.subscriberTrustedSourceContextId)
        }
    }
}
