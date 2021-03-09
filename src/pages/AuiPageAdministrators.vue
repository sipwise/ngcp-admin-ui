<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="admins"
            resource="admins"
            resource-base-path="administrator"
            resource-type="ajax"
            resource-alt="administrator/ajax"
            :resource-singular="$t('administrator')"
            :resource-plural="$t('administrators')"
            row-key="id"
            :title="$t('Administrators')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :deletable="true"
            deletion-subject="login"
        >
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    v-if="props.row.id === userId"
                    color="primary"
                    icon="vpn_key"
                    :label="$t('Change password')"
                    @click="showDialogChangePassword(props)"
                />
                <aui-popup-menu-item
                    v-if="props.row.id === userId"
                    color="primary"
                    icon="fas fa-file-contract"
                    :label="$t('Certificate Management')"
                    @click="showDialogAdminCert(props.row)"
                />
                <q-separator />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import { showGlobalSuccessMessage } from 'src/helpers/ui'

const LOGIN_MIN_LENGTH = 5
import {
    mapActions,
    mapState,
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
import AuiDialogAdminCert from 'components/dialog/AuiDialogAdminCert'
import {
    email,
    required,
    minLength
} from 'vuelidate/lib/validators'
export default {
    name: 'AuiPageAdministrators',
    components: {
        AuiPopupMenuItem,
        AuiDataTable
    },
    data () {
        return {
            dialogAdminCert: true,
            dialogAdminCertAdmin: null,
            actionNotAllowedDialog: false,
            confirmCertificateRevocation: false,
            resellerPopupEditValue: {
                label: '',
                value: null
            },
            loginPopupEditValue: null
        }
    },
    computed: {
        ...mapState('administrators', [
            'administrators',
            'administratorsPagination',
            'administratorsFilter',
            'administratorsState',
            'adminCertHasCert'
        ]),
        ...mapGetters('administrators', [
            'hasAdminUpdateSucceeded',
            'adminCertRequesting'
        ]),
        ...mapGetters('user', [
            'userId',
            'isDialogRequesting',
            'hasDialogSucceeded',
            'hasDialogFailed',
            'dialogError'
        ]),
        isAdministratorsLoading () {
            return this.administratorsState === 'requesting'
        },
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-users',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers'
                },
                {
                    name: 'login',
                    label: this.$t('Login'),
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
                            validator: minLength(LOGIN_MIN_LENGTH),
                            error: this.$t('Input must contain at least {min} characters', {
                                min: LOGIN_MIN_LENGTH
                            })
                        }
                    ]
                },
                {
                    name: 'email',
                    label: this.$t('Email'),
                    field: 'email',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentIcon: 'email',
                    componentValidations: [
                        {
                            name: 'email',
                            validator: email,
                            error: this.$t('Input a valid email address')
                        }
                    ]
                },
                {
                    name: 'is_master',
                    label: this.$t('Is Master'),
                    field: 'is_master',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'is_ccare',
                    label: this.$t('Is CCare'),
                    field: 'is_ccare',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'is_active',
                    label: this.$t('Is Active'),
                    field: 'is_active',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'read_only',
                    label: this.$t('Is Read Only'),
                    field: 'read_only',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'show_passwords',
                    label: this.$t('Show Passwords'),
                    field: 'show_passwords',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle',
                    icon: 'visibility'
                },
                {
                    name: 'call_data',
                    label: this.$t('Show CDRs'),
                    field: 'call_data',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle',
                    icon: 'call'
                },
                {
                    name: 'billing_data',
                    label: this.$t('Show Billing Info'),
                    field: 'billing_data',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle',
                    icon: 'attach_money'
                },
                {
                    name: 'can_reset_password',
                    label: this.$t('Can Reset Password'),
                    field: 'can_reset_password',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'lawful_intercept',
                    label: this.$t('Lawful Intercept'),
                    field: 'lawful_intercept',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'is_system',
                    label: this.$t('Is System'),
                    field: 'is_system',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    watch: {
        hasDialogSucceeded (value) {
            if (value === true) {
                this.changePasswordDialog = false
            }
        },
        hasAdminUpdateSucceeded (value) {
            if (value === true) {
                showGlobalSuccessMessage(this.$t('Administrator updated successfully'))
            }
        }
    },
    methods: {
        ...mapActions('dataTable', [
            'patchResource'
        ]),
        ...mapActions('administrators', [
            'changeAdministratorPassword'
        ]),
        showDialogChangePassword (admin) {
            this.$q.dialog({
                component: ChangePasswordDialog,
                parent: this,
                admin: admin
            })
        },
        showDialogAdminCert (admin) {
            this.$q.dialog({
                component: AuiDialogAdminCert,
                parent: this,
                admin: admin
            })
        }
    }
}
</script>
