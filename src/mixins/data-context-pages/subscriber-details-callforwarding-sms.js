import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        smsContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingSmsContext')
        },
        smsContextCfs () {
            return this.smsContext?.cfs
        }
    },
    methods: {
        async reloadSmsContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingSmsContext')
        }
    }
}
