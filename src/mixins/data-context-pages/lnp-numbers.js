import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        lnpNumbersContext () {
            return this.getDataContextObject('lnpNumbersContext')
        },
        lnpNumbersContextId () {
            return this.$route.params.id
        },
        // Used in the context of a Carrier
        lnpCarrierNumbersContextId () {
            return this.$route.params.numberId
        }
    },
    methods: {
        async reloadLnpNumbersContext () {
            await this.reloadDataContext('lnpNumbersContext')
        }
    }
}
