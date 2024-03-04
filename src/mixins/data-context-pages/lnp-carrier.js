import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        lnpCarrierContext () {
            return this.getDataContextObject('lnpCarrierContext')
        }
    }
}
