'use strict'

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('customers', [
            'customerStatusOptions'
        ])
    },
    methods: {
        getCustomerIdColumn () {
            return {
                name: 'id',
                label: this.$t('Id'),
                field: 'id',
                sortable: true,
                align: 'center'
            }
        },
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
        getCustomerProductNameColumn (isAjax) {
            return {
                name: 'product_name',
                label: this.$t('Product'),
                field: isAjax ? 'product_name' : 'type',
                sortable: true,
                align: 'left'
            }
        },
        getCustomerContactEmailColumn (isAjax) {
            return {
                name: 'contact_email',
                label: this.$t('Contact Email'),
                field: isAjax ? 'contact_email' : 'contact.email',
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
        }
    }
}
