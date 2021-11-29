<template>
    <aui-base-sub-context>
        <!-- TODO using "ajax" instead of "api" due to missing contract_cnt and voucher_cnt -->
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="package"
            row-key="id"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="ajax"
            :resource-alt="resourceUrl"
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
            :deletion-text="$t('You are about to delete profile package # {subject}')"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
        resourceUrl () {
            return 'package/ajax/filter_reseller/' + this.resourceObject.id
        },
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
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'voucher_cnt',
                    label: this.$t('Vouchers'),
                    field: 'voucher_cnt',
                    sortable: true,
                    align: 'left'
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
    }
}
</script>
