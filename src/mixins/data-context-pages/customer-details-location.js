import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        customerLocationContext () {
            return this.getDataContextObject('customerDetailsLocationContext')
        }
    },
    methods: {
        async reloadCustomerLocationContext () {
            await this.reloadDataContext('customerDetailsLocationContext')
        }
    }
}
