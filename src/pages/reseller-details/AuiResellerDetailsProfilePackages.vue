<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="package"
            row-key="id"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="api"
            :resource-default-filters="{
                reseller_id: resourceObject.id,
                contract_cnt: 10,
                voucher_cnt: true
            }"
            :resource-singular="$t('Package')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'billingProfilePackageCreation' }]"
            :searchable="true"
            :editable="true"
            :deletable="true"
            :row-deletable="(row) => row.contract_cnt < 1 && row.voucher_cnt < 1"
            :deletion-label="$t('Delete')"
            deletion-subject="id"
            :deletion-title="$t('Delete profile package')"
            :deletion-text="'You are about to delete profile package # {subject}'"
            :show-header="false"
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
    </aui-base-sub-context>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { profileMappingsLabel } from 'src/filters/resource'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsProfilePackages',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
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
    }
}
</script>
