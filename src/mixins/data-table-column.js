import {
    minLength,
    required
} from '@vuelidate/validators'
import { ADMIN_LIST_LOGIN_MIN_LENGTH } from 'src/constants'
import { formatPhoneNumber } from 'src/filters/resource'

export default {
    computed: {
        idColumn () {
            return {
                name: 'id',
                label: this.$t('Id'),
                field: 'id',
                sortable: true,
                align: 'left'
            }
        },
        nameColumn () {
            return {
                name: 'name',
                label: this.$t('Name'),
                field: 'name',
                sortable: true,
                editable: true,
                component: 'input',
                align: 'left'
            }
        },
        expandedResellerNameColumn () {
            return {
                name: 'reseller_name',
                label: this.$t('Reseller'),
                field: 'reseller_id_expand.name',
                expand: 'reseller_id',
                sortable: false,
                align: 'left',
                editable: true,
                component: 'select-lazy',
                componentIcon: 'fas fa-users',
                componentField: 'reseller_id',
                componentOptionsGetter: 'resellers/filteredResellerOptions',
                componentOptionsAction: 'resellers/filterResellers'
            }
        }
    },
    methods: {
        getIdColumn () {
            return this.idColumn
        },
        getAdminLoginColumn (label, name) {
            return {
                name,
                label,
                field: 'login',
                sortable: true,
                align: 'left',
                editable: true,
                component: 'input',
                componentIcon: 'fas fa-user-cog',
                componentValidations: [
                    {
                        name: 'required',
                        validator: required,
                        error: this.$t('Input must not be empty')
                    },
                    {
                        name: 'minLength',
                        validator: minLength(ADMIN_LIST_LOGIN_MIN_LENGTH),
                        error: this.$t('Input must contain at least {min} characters', {
                            min: ADMIN_LIST_LOGIN_MIN_LENGTH
                        })
                    }
                ]
            }
        },
        getAdminIsMasterColumn () {
            return {
                name: 'is_master',
                label: this.$t('Is Master'),
                field: 'is_master',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle'
            }
        },
        getAdminIsActiveColumn () {
            return {
                name: 'is_active',
                label: this.$t('Is Active'),
                field: 'is_active',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle'
            }
        },
        getAdminReadOnlyColumn () {
            return {
                name: 'read_only',
                label: this.$t('Is Read Only'),
                field: 'read_only',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle'
            }
        },
        getAdminShowPasswordColumn () {
            return {
                name: 'show_passwords',
                label: this.$t('Show Passwords'),
                field: 'show_passwords',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle',
                icon: 'visibility'
            }
        },
        getAdminCallDataColumn () {
            return {
                name: 'call_data',
                label: this.$t('Show CDRs'),
                field: 'call_data',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle',
                icon: 'call'
            }
        },
        getAdminBillingDataColumn () {
            return {
                name: 'billing_data',
                label: this.$t('Show Billing Info'),
                field: 'billing_data',
                sortable: true,
                align: 'center',
                editable: true,
                component: 'toggle',
                icon: 'attach_money'
            }
        },
        getPhoneNumberColumn () {
            return {
                name: 'number',
                label: this.$t('Number'),
                field: 'primary_number.sn',
                formatter: ({ row }) => formatPhoneNumber(row.primary_number, ''),
                sortable: true,
                align: 'left'
            }
        },
        getPbxExtension () {
            return {
                name: 'pbx_extension',
                label: this.$t('Extension'),
                field: 'pbx_extension',
                sortable: true,
                editable: true,
                component: 'input',
                align: 'left'
            }
        },
        getDomainColumn () {
            return {
                name: 'domain',
                label: this.$t('Domain'),
                field: 'domain',
                sortable: true,
                align: 'left'
            }
        },
        getExpandedResellerNameColumn () {
            return this.expandedResellerNameColumn
        },
        getNameColumn () {
            return this.nameColumn
        },
        getResellerNameColumn (type = 'api') {
            const column = {
                name: 'reseller_name',
                label: this.$t('Reseller'),
                sortable: false,
                align: 'left',
                editable: true,
                component: 'select-lazy',
                componentIcon: 'fas fa-users',
                componentField: 'reseller_id',
                componentOptionsGetter: 'resellers/filteredResellerOptions',
                componentOptionsAction: 'resellers/filterResellers'
            }
            if (type === 'api') {
                column.field = 'reseller_id_expand.name'
                column.expand = 'reseller_id'
            } else if (type === 'ajax') {
                column.field = 'reseller_name'
            }
            return column
        }
    }
}
