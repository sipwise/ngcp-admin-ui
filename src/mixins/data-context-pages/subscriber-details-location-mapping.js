import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberLocationMappingContextId () {
            return 'subscriberLocationMappingContext'
        },
        subscriberLocationMappingContextResource () {
            return 'subscriberlocationmappings'
        },
        subscriberLocationMappingContextResourceId () {
            return this.$route.params.locationMappingId
        },
        subscriberLocationMappingContextResourceFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        },
        subscriberLocationMappingContext () {
            return this.getDataContextObject(this.subscriberLocationMappingContextId)
        }
    },
    methods: {
        async loadSubscriberLocationMappingContext () {
            await this.loadDataContext({
                resourceObjectId: this.subscriberLocationMappingContextId,
                resource: this.subscriberLocationMappingContextResource,
                resourceId: this.subscriberLocationMappingContextResourceId,
                resourceFilters: this.subscriberLocationMappingContextResourceFilters
            })
        },
        async reloadSubscriberLocationMappingContext () {
            await this.reloadDataContext(this.subscriberLocationMappingContextId)
        }
    }
}
