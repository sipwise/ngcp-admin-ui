<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="admins"
            resource="admins"
            resource-base-path="administrator"
            resource-type="api"
            :resource-singular="$t('Administrator')"
            row-key="id"
            :title="$t('Administrators')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :deletable="true"
            deletion-subject="login"
            resource-search-field="login"
            :resource-search-wildcard="true"
            :show-header="false"
            :add-action-routes="[{ name: 'adminCreation' }]"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'login',
                    label: $t('Login'),
                    component: 'input'
                }
            ]"
            journal-route-name="adminJournalAdvanced"
        />
    </aui-base-list-page>
</template>

<script>

import { email } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiDialogAdminCert from 'components/dialog/AuiDialogAdminCert'
import ResetPasswordDialog from 'components/dialog/ResetPasswordDialog'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiDialogResetOtp from 'src/components/dialog/AuiDialogResetOtp'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'AuiAdminList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        ...mapGetters('administrators', [
            'hasAdminUpdateSucceeded',
            'adminRolesList'
        ]),
        ...mapState('user', [
            'user'
        ]),
        ...mapGetters('user', [
            'hasDialogSucceeded',
            'hasDialogFailed'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                this.getExpandedResellerNameColumn(),
                this.getAdminLoginColumn(this.$t('Login'), 'login'),
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
                    name: 'role',
                    label: this.$t('Role'),
                    field: 'role',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentIcon: 'fas fa-user-shield',
                    componentField: 'role',
                    componentOptions: this.adminRolesList,
                    displayValue: true
                },
                this.getAdminIsMasterColumn(),
                this.getAdminIsActiveColumn(),
                this.getAdminEnable2FAColumn(),
                this.getAdminReadOnlyColumn(),
                this.getAdminShowPasswordColumn(),
                this.getAdminCallDataColumn(),
                this.getAdminBillingDataColumn(),
                {
                    name: 'can_reset_password',
                    label: this.$t('Can Reset Password'),
                    field: 'can_reset_password',
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
                this.resetPasswordDialog = false
            }
        },
        hasAdminUpdateSucceeded (value) {
            if (value === true) {
                showGlobalSuccessMessage(this.$t('Administrator updated successfully'))
            }
        }
    },
    methods: {
        ...mapActions('administrators', [
            'resetAdministratorOtp'
        ]),
        async resetOtp (adminId) {
            try {
                await this.resetAdministratorOtp(adminId)
                showGlobalSuccessMessage(this.$t('OTP reset successfully'))
            } catch (err) {
                showGlobalErrorMessage(this.$t('Failed to reset OTP'))
            }
        },
        rowActions ({ row }) {
            return [
                'adminEdit',
                {
                    id: 'adminResetPassword',
                    color: 'primary',
                    icon: 'vpn_key',
                    label: this.$t('Reset password'),
                    visible: this.$aclCan('update', 'entity.admins.columns.password', row, this.user) && row.can_reset_password,
                    click: () => {
                        this.showDialogResetPassword(row)
                    }
                },
                {
                    id: 'resetOtp',
                    color: 'primary',
                    icon: 'fas fa-user-shield',
                    label: this.$t('Reset OTP'),
                    visible: this.user.is_master ? this.$aclCan('update', 'entity.admins') : false,
                    click: () => {
                        this.showDialogResetOtp(row)
                    }
                },
                {
                    id: 'adminChangeCertificate',
                    color: 'primary',
                    icon: 'fas fa-file-contract',
                    label: this.$t('Certificate Management'),
                    visible: this.$aclCan('update', 'entity.admins.apiKey', row, this.user),
                    click: () => {
                        this.showDialogAdminCert(row)
                    }
                },
                'adminJournal'
            ]
        },
        showDialogAdminCert (admin) {
            this.$q.dialog({
                component: AuiDialogAdminCert,
                componentProps: {
                    admin
                }
            })
        },
        showDialogResetOtp (admin) {
            this.$q.dialog({
                component: AuiDialogResetOtp,
                componentProps: {
                    user: admin,
                    is2FaEnabled: admin.enable_2fa
                }
            }).onOk(async (adminId) => {
                try {
                    await this.resetAdministratorOtp(adminId)
                    showGlobalSuccessMessage(this.$t('OTP reset successfully'))
                } catch (error) {
                    showGlobalErrorMessage(this.$t('Failed to reset OTP'))
                }
            })
        },
        showDialogResetPassword (admin) {
            this.$q.dialog({
                component: ResetPasswordDialog,
                componentProps: {
                    admin
                }
            })
        }
    }
}
</script>
