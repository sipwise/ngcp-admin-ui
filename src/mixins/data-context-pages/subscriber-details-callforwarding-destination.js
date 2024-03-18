import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        destinationSetContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingDestinationSetContext')
        }
    },
    methods: {
        async reloadDestinationSetContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingDestinationSetContext')
        }
    }
}
