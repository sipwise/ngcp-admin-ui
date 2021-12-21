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
            :row-menu-route-names="rowActionRouteNames"
        >
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.admins.columns.password', props.row, user)"
                    color="primary"
                    icon="vpn_key"
                    :label="$t('Change password')"
                    @click="showDialogChangePassword(props)"
                />
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.admins.apiKey', props.row, user)"
                    color="primary"
                    icon="fas fa-file-contract"
                    :label="$t('Certificate Management')"
                    @click="showDialogAdminCert(props.row)"
                />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import { showGlobalSuccessMessage } from 'src/helpers/ui'

import {
    mapState,
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
import AuiDialogAdminCert from 'components/dialog/AuiDialogAdminCert'
import dataTableColumn from 'src/mixins/data-table-column'
import { email } from 'vuelidate/lib/validators'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiAdminList',
    components: {
        AuiBaseListPage,
        AuiPopupMenuItem,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    data () {
        return {
        }
    },
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
        },
        rowActionRouteNames () {
            return [
                'adminEdit'
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
