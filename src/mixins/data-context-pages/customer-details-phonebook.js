import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        customerPhonebookContext () {
            return this.getDataContextObject('customerDetailsPhonebookContext')
        }
    },
    methods: {
        async reloadCustomerPhonebookContext () {
            await this.reloadDataContext('customerDetailsPhonebookContext')
        }
    }
}
