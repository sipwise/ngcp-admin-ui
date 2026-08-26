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
            resource-type="api"
            :resource-default-filters="{
                contract_cnt: 10,
                voucher_cnt: true
            }"
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
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'profile_name',
                    label: $t('Billing Profile'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'network_name',
                    label: $t('Billing Network'),
                    component: 'input',
                    wildcard: true
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { profileMappingsLabel } from 'src/filters/resource'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
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
                    name: 'reseller_id',
                    label: this.$t('Reseller'),
                    field: 'reseller_id_expand.name',
                    expand: 'reseller_id',
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
                    sortable: false,
                    align: 'left',
                    editable: true,
                    format: (val) => {
                        return val > 10 ? '10+' : val
                    }
                },
                {
                    name: 'voucher_cnt',
                    label: this.$t('Vouchers'),
                    field: 'voucher_cnt',
                    sortable: false,
                    align: 'left',
                    editable: true,
                    format: (val) => {
                        return val > 10 ? '10+' : val
                    }
                },
                {
                    name: 'initial_profiles_grp',
                    label: this.$t('Initial Profiles'),
                    field: 'initial_profiles',
                    expand: 'initial_profiles',
                    sortable: false,
                    align: 'left',
                    formatter: ({ value }) => profileMappingsLabel(value, this.$t('N/A'))
                },
                {
                    name: 'underrun_profiles_grp',
                    label: this.$t('Underrun Profiles'),
                    field: 'underrun_profiles',
                    expand: 'underrun_profiles',
                    sortable: false,
                    align: 'left',
                    formatter: ({ value }) => profileMappingsLabel(value, this.$t('N/A'))
                },
                {
                    name: 'topup_profiles_grp',
                    label: this.$t('Top-up Profiles'),
                    field: 'topup_profiles',
                    expand: 'topup_profiles',
                    sortable: false,
                    align: 'left',
                    formatter: ({ value }) => profileMappingsLabel(value, this.$t('N/A'))
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
