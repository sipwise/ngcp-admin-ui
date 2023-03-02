import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        peeringServerContext () {
            return this.getDataContextObject('peeringGroupDetailsServerContext')
        }
    },
    methods: {
        async reloadPeeringServerContext () {
            await this.reloadDataContext('peeringGroupDetailsServerContext')
        }
    }
}
