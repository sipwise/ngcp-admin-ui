import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        soundSetsContextId () {
            return 'soundSetsContext'
        },
        customerSoundSetsContextId () {
            return 'customerDetailsSoundSetsContext'
        },
        soundSetsContextResource () {
            return 'soundsets'
        },
        soundSetsContextResourceId () {
            return this.$route.params.id
        },
        customerSoundSetsContextResourceId () {
            return this.$route.params.soundId
        },
        soundSetsContextExpand () {
            return [
                'reseller_id',
                'customer_id',
                'customer_id.contact_id'
            ]
        },
        soundSetsContext () {
            return this.getDataContextObject(this.soundSetsContextId)
        },
        soundSetsContextReseller () {
            return this.soundSetsContext?.reseller_id_expand
        },
        soundSetsContextParentId () {
            return this.soundSetsContext?.parent_id
        },
        soundSetsContextParentName () {
            return this.soundSetsContext?.parent_name
        },
        soundSetsContextCustomer () {
            return this.soundSetsContext?.customer_id_expand
        },
        soundSetsContextContact () {
            return this.soundSetsContext?.customer_id_expand?.contact_id_expand
        },
        customerSoundSetsContext () {
            return this.getDataContextObject(this.customerSoundSetsContextId)
        },
        customerSoundSetsContextReseller () {
            return this.customerSoundSetsContext?.reseller_id_expand
        },
        customerSoundSetsContextParentId () {
            return this.customerSoundSetsContext?.parent_id
        },
        customerSoundSetsContextParentName () {
            return this.customerSoundSetsContext?.parent_name
        },
        customerSoundSetsContextCustomer () {
            return this.customerSoundSetsContext?.customer_id_expand
        }
    },
    methods: {
        async reloadSoundSetsContext () {
            await this.reloadDataContext(this.soundSetsContextId)
        },
        async reloadCustomerSoundSetsContext () {
            await this.reloadDataContext(this.customerSoundSetsContextId)
        }
    }
}
