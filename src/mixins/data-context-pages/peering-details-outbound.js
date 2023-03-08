import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        peeringOutboundContext () {
            return this.getDataContextObject('peeringGroupDetailsOutboundRuleContext')
        }
    },
    methods: {
        async reloadPeeringOutboundContext () {
            await this.reloadDataContext('peeringGroupDetailsOutboundRuleContext')
        }
    }
}
