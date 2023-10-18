<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="package"
            row-key="id"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="ajax"
            resource-alt="package/ajax"
            :resource-singular="$t('Profile Packages')"
            :title="$t('Profile Packages')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'billingProfilePackageCreation'}]"
            :deletable="true"
            :row-deletable="(row) => row.contract_cnt < 1 && row.voucher_cnt < 1"
            :show-header="false"
            :deletion-label="$t('Delete')"
            :deletion-text="'You are about to delete Profile Package # {subject}'"
            deletion-subject="id"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTableColumn from 'src/mixins/data-table-column'
import { required } from '@vuelidate/validators'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiProfilePackageList',
    components: {
        AuiDataTable,
        AuiBaseListPage
    },
    mixins: [
        dataTableColumn,
        dataTable
    ],
    computed: {
        columns () {
            return [
                this.idColumn,
                {
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    component: 'input',
                    editable: true,
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'contract_cnt',
                    label: this.$t('Contracts'),
                    field: 'contract_cnt',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'voucher_cnt',
                    label: this.$t('Vouchers'),
                    field: 'voucher_cnt',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'initial_profiles_grp',
                    label: this.$t('Initial Profiles'),
                    field: 'initial_profiles_grp',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'underrun_profiles_grp',
                    label: this.$t('Underrun Profiles'),
                    field: 'underrun_profiles_grp',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'topup_profiles_grp',
                    label: this.$t('Top-up Profiles'),
                    field: 'topup_profiles_grp',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'billingProfilePackageEdit',
                'billingProfilePackageDetails'
            ]
        }
    }
}
</script>
