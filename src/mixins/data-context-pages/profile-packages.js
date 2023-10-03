import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    mixins: [dataContextPageMixin],
    computed: {
        billingProfilePackageContextId () {
            return 'billingProfilePackageContext'
        },
        billingProfilePackageContext () {
            return this.getDataContextObject(this.billingProfilePackageContextId)
        },
        billingProfilePackageContextResourceId () {
            return this.$route.params.id
        },
        billingProfilePackageContextExpand () {
            return [
                'reseller_id'
            ]
        },
        billingProfilePackageContextReseller () {
            return this.billingProfilePackageContext?.reseller_id_expand
        },
        billingProfilePackageContextRelations () {
            return {
                initial_profiles: {
                    name: 'billingProfiles',
                    type: Array,
                    resources: {
                        profile_id: {
                            name: 'profile',
                            resource: 'billingprofiles'
                        },
                        network_id: {
                            name: 'network',
                            resource: 'billingnetworks'
                        }
                    }
                },
                underrun_profiles: {
                    name: 'underrunProfiles',
                    type: Array,
                    resources: {
                        profile_id: {
                            name: 'profile',
                            resource: 'billingprofiles'
                        },
                        network_id: {
                            name: 'network',
                            resource: 'billingnetworks'
                        }
                    }
                },
                topup_profiles: {
                    name: 'topupProfiles',
                    type: Array,
                    resources: {
                        profile_id: {
                            name: 'profile',
                            resource: 'billingprofiles'
                        },
                        network_id: {
                            name: 'network',
                            resource: 'billingnetworks'
                        }
                    }
                }
            }
        },
        billingProfilePackageContextBillingProfiles () {
            return this.getDataContextRelatedObject(this.billingProfilePackageContextId, 'billingProfiles') || []
        },
        billingProfilePackageContextUnderrunProfiles () {
            return this.getDataContextRelatedObject(this.billingProfilePackageContextId, 'underrunProfiles') || []
        },
        billingProfilePackageContextTopupProfiles () {
            return this.getDataContextRelatedObject(this.billingProfilePackageContextId, 'topupProfiles') || []
        }
    },
    methods: {
        async reloadBillingProfilePackageContext () {
            await this.reloadDataContext(this.billingProfilePackageContextId)
        }
    }
}
