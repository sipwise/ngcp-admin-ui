import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberPhonebookContextId () {
            return 'subscriberPhonebookContext'
        },
        subscriberPhonebookContextResource () {
            return 'phonebookentries'
        },
        subscriberPhonebookContextResourceId () {
            return this.$route.params.phonebookId
        },
        subscriberPhonebookContextResourceFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
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
                resourceId: this.subscriberPhonebookContextResourceId,
                resourceFilters: this.subscriberPhonebookContextResourceFilters
            })
        },
        async reloadSubscriberPhonebookContext () {
            await this.reloadDataContext(this.subscriberPhonebookContextId)
        }
    }
}
