<template>
    <aui-base-list-page
        acl-resource="entity.admins"
        :add-button-split="false"
        :add-button-routes="[{ name: 'adminCreation' }]"
        :row-action-split="true"
        :row-action-route-names="rowActionRouteNames"
    >
        <aui-data-table
            ref="table"
            table-id="admins"
            resource="admins"
            resource-base-path="administrator"
            resource-type="ajax"
            resource-alt="administrator/ajax"
            :resource-singular="$t('Administrator')"
            row-key="id"
            :title="$t('Administrators')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :deletable="true"
            deletion-subject="login"
            :show-header="false"
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
                <q-separator />
            </template>
        </aui-data-table>
    </aui-base-list-page>
</template>

<script>
import { showGlobalSuccessMessage } from 'src/helpers/ui'

import {
    mapActions,
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
export default {
    name: 'AuiAdminList',
    components: {
        AuiBaseListPage,
        AuiPopupMenuItem,
        AuiDataTable
    },
    mixins: [
        dataTableColumn
    ],
    data () {
        return {
            selectedRows: []
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
        ...mapState('user', [
            'user'
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
                this.getIdColumn(),
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
                this.getAdminIsMasterColumn(),
                {
                    name: 'is_ccare',
                    label: this.$t('Is CCare'),
                    field: 'is_ccare',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
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
