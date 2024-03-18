import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        overflowContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingOnOverflowContext')
        }
    },
    methods: {
        async reloadOverflowContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingOnOverflowContext')
        }
    }
}
