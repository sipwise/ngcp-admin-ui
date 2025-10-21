import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberPhonebookContextId () {
            return 'subscriberPhonebookContext'
        },
        subscriberPhonebookContextResource () {
            return `v2/subscribers/${this.$route.params.id}/phonebook`
        },
        subscriberPhonebookContextResourceId () {
            return this.$route.params.phonebookId
        },
        subscriberPhonebookContext () {
            return this.getDataContextObject(this.subscriberPhonebookContextId)
        }
    },
    methods: {
        async loadSubscriberPhonebookContext () {
            await this.loadDataContext({
                resourceObjectId: this.subscriberPhonebookContextId,
                resource: this.subscriberPhonebookContextResource,
                resourceId: this.subscriberPhonebookContextResourceId
            })
        },
        async reloadSubscriberPhonebookContext () {
            await this.reloadDataContext(this.subscriberPhonebookContextId)
        }
    }
}
