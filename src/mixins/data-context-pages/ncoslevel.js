import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        ncoslevelContextId () {
            return 'ncosLevelsContext'
        },
        ncoslevelContext () {
            return this.getDataContextObject(this.ncoslevelContextId)
        }
    }
}
