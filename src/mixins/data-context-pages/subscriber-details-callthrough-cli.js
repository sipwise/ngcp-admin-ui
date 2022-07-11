import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberCallthroughCliContextId () {
            return 'subscriberCallthroughCliContext'
        },
        subscriberCallthroughCliContextResource () {
            return 'ccmapentries'
        },
        subscriberCallthroughCliContextResourceId () {
            return this.$route.params.id
        },
        subscriberCallthroughCliContext () {
            return this.getDataContextObject(this.subscriberCallthroughCliContextId)
        }
    },
    methods: {
        async loadSubscriberCallthroughCliContext () {
            await this.loadDataContext({
                resource: this.subscriberCallthroughCliContextResource,
                resourceId: this.subscriberCallthroughCliContextResourceId,
                resourceObjectId: this.subscriberCallthroughCliContextId
            })
        },
        async reloadSubscriberCallthroughCliContext () {
            await this.reloadDataContext(this.subscriberCallthroughCliContextId)
        }
    }
}
