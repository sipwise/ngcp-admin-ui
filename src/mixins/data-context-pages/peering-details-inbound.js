import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        peeringInboundContext () {
            return this.getDataContextObject('peeringGroupDetailsInboundRuleContext')
        },
        peeringInboundContextId () {
            return this.$route.params.inboundrulesId
        }
    },
    methods: {
        async reloadPeeringInboundContext () {
            await this.reloadDataContext('peeringGroupDetailsInboundRuleContext')
        }
    }
}
