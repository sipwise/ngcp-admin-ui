import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        soundSetsContextId () {
            return 'soundSetsContext'
        },
        soundSetsContextResource () {
            return 'soundsets'
        },
        soundSetsContextResourceId () {
            return this.$route.params.id
        },
        billingProfileContextExpand () {
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
        }
    },
    methods: {
        async reloadSoundSetsContext () {
            await this.reloadDataContext(this.soundSetsContextId)
        }
    }
}
