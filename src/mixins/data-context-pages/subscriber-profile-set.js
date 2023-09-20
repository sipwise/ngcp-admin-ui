import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberProfileSetContext () {
            return this.getDataContextObject('subscriberProfileSetContext')
        },
        subscriberProfileExpand () {
            return [
                'reseller_id'
            ]
        }
    },
    methods: {
        async reloadSubscriberProfileSetContext () {
            await this.reloadDataContext('subscriberProfileSetContext')
        }
    }
}
