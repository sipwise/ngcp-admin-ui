import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        peeringContextId () {
            return 'peeringGroupContext'
        },
        peeringContext () {
            return this.getDataContextObject(this.peeringContextId)
        }
    }
}
