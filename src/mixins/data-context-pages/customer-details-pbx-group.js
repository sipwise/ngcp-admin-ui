import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        customerPbxGroupContext () {
            return this.getDataContextObject('customerDetailsPbxGroupContext')
        },
        customerPbxGroupContextId () {
            return this.$route.params.pbxGroup
        }
    },
    methods: {
        async reloadCustomerPbxGroupContext () {
            await this.reloadDataContext('customerDetailsPbxGroupContext')
        }
    }
}
