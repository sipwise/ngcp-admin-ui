import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberUpnRewriteContextId () {
            return 'subscriberUpnRewriteContext'
        },
        subscriberUpnRewriteContextResource () {
            return 'upnrewritesets'
        },
        subscriberUpnRewriteContextResourceId () {
            return this.$route.params.upnRewriteId
        },
        subscriberUpnRewriteContextResourceFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        },
        subscriberUpnRewriteContext () {
            return this.getDataContextObject(this.subscriberUpnRewriteContextId)
        }
    },
    methods: {
        async loadSubscriberUpnRewriteContext () {
            await this.loadDataContext({
                resourceObjectId: this.subscriberUpnRewriteContextId,
                resource: this.subscriberUpnRewriteContextResource,
                resourceId: this.subscriberUpnRewriteContextResourceId,
                resourceFilters: this.subscriberUpnRewriteContextResourceFilters
            })
        },
        async reloadSubscriberUpnRewriteContext () {
            await this.reloadDataContext(this.subscriberUpnRewriteContextId)
        }
    }
}
