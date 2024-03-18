import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        busyContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingBusyContext')
        },
        busyContextCfb () {
            return this.busyContext?.cfb
        }
    },
    methods: {
        async reloadBusyContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingBusyContext')
        }
    }
}
