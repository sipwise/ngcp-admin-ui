import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        subscriberProfileContext () {
            return this.getDataContextObject('subscriberProfileContext')
        },
        subscriberProfileContextId () {
            return this.$route.params.profileId
        }
    },
    methods: {
        async reloadSubscriberProfileContext () {
            await this.reloadDataContext('subscriberProfileContext')
        }
    }
}
