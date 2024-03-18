import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        unconditionalContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingUnconditionalContext')
        },
        unconditionalContextCfu () {
            return this.unconditionalContext?.cfu
        }
    },
    methods: {
        async reloadUncondtionalContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingUnconditionalContext')
        }
    }
}
