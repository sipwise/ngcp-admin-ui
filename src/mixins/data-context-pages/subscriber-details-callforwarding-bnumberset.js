import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        bnumberSetContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingBNumberSetContext')
        }
    },
    methods: {
        async reloadBNumberSetContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingBNumberSetContext')
        }
    }
}
