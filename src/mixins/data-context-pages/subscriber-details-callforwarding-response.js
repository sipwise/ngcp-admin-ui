import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        responseContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingOnResponseContext')
        }
    },
    methods: {
        async reloadResponseContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingOnResponseContext')
        }
    }
}
