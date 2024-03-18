import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        unavailableContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingUnavailableContext')
        },
        unavailableContextCfna () {
            return this.unavailableContext?.cfna
        }
    },
    methods: {
        async reloadUnavailableContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingUnavailableContext')
        }
    }
}
