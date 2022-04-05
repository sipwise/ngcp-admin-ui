import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('customers', [
            'customerStatusOptions'
        ])
    },
    methods: {

        getCustomerExternalIdColumn () {
            return {
                name: 'external_id',
                label: this.$t('External #'),
                field: 'external_id',
                sortable: true,
                editable: true,
                component: 'input',
                align: 'left'
            }
        },
        getCustomerResellerNameColumn () {
            return {
                name: 'reseller_name',
                label: this.$t('Reseller'),
                field: 'contact_id_expand.reseller_id_expand.name',
                expand: 'contact_id.reseller_id',
                sortable: true,
                align: 'left'
            }
        },
        getCustomerContactEmailColumn () {
            return {
                name: 'contact_email',
                label: this.$t('Contact Email'),
                field: 'contact_id_expand.email',
                expand: 'contact_id',
                sortable: true,
                align: 'left',
                editable: true,
                component: 'select-lazy',
                componentIcon: 'fas fa-envelope',
                componentField: 'contact_id',
                componentOptionsGetter: 'contracts/customerContactsAsOptions',
                componentOptionsAction: 'contracts/fetchCustomerContacts'
            }
        },
        getCustomerContactFirstnameColumn () {
            return {
                name: 'contact_firstname',
                label: this.$t('Firstname'),
                field: 'contact_id_expand.firstname',
                expand: 'contact_id',
                sortable: true,
                align: 'left',
                editable: true,
                component: 'input',
                componentSaveFunction: ({ row, input, patch }) => {
                    patch({
                        resource: 'customercontacts',
                        resourceId: row.contact_id,
                        field: 'firstname',
                        value: input
                    })
                }
            }
        },
        getCustomerContactLastnameColumn () {
            return {
                name: 'contact_lastname',
                label: this.$t('Lastname'),
                field: 'contact_id_expand.lastname',
                expand: 'contact_id',
                sortable: true,
                align: 'left',
                editable: true,
                component: 'input',
                componentSaveFunction: ({ row, input, patch }) => {
                    patch({
                        resource: 'customercontacts',
                        resourceId: row.contact_id,
                        field: 'lastname',
                        value: input
                    })
                }
            }
        },
        getCustomerProductNameColumn () {
            return {
                name: 'product',
                label: this.$t('Product'),
                field: 'type',
                formatter: ({ row }) => {
                    switch (row.type) {
                    case 'sipaccount':
                        return this.$t('Basic SIP Account')
                    case 'pbxaccount':
                        return this.$t('Cloud PBX Account')
                    }
                },
                sortable: true,
                align: 'left'
            }
        },
        getCustomerBillingProfileNameColumn () {
            return {
                name: 'billing_profile_name',
                label: this.$t('Billing Profile'),
                field: 'billing_profile_id_expand.name',
                expand: 'billing_profile_id',
                sortable: true,
                align: 'left'
            }
        },
        getCustomerStatusColumn () {
            return {
                name: 'status',
                label: this.$t('Status'),
                field: 'status',
                sortable: true,
                align: 'left',
                editable: true,
                component: 'select',
                componentOptions: this.customerStatusOptions
            }
        },
        getCustomerMaxSubscribersColumn () {
            return {
                name: 'max_subscribers',
                label: this.$t('Max. Subscribers'),
                field: 'max_subscribers',
                sortable: true,
                editable: true,
                component: 'input',
                align: 'left'
            }
        }
    }
}
