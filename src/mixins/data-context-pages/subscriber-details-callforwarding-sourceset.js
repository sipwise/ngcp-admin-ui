import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        sourceSetContext () {
            return this.getDataContextObject('subscriberDetailsCallForwardingSourceSetContext')
        }
    },
    methods: {
        async reloadSourceSetContext () {
            await this.reloadDataContext('subscriberDetailsCallForwardingSourceSetContext')
        }
    }
}
