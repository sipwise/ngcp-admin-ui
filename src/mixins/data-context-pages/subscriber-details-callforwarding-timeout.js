import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        timeoutContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingTimeOutContext')
        }
    },
    methods: {
        async reloadTimeoutContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingTimeOutContext')
        }
    }
}
