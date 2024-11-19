import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        unconditionalContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingUnconditionalContext')
        }
    },
    methods: {
        async reloadUnconditionalContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingUnconditionalContext')
        }
    }
}
