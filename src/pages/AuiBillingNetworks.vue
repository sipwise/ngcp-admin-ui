<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="network"
            row-key="id"
            resource="billingnetworks"
            resource-base-path="network"
            resource-type="ajax"
            resource-alt="network/ajax"
            :resource-singular="$t('Billing Network')"
            :title="$t('Billing Networks')"
            :columns="columns"
            :addable="true"
            :searchable="true"
            :editable="true"
            :deletable="true"
            :deletion-label="$t('Terminate')"
            deletion-subject="id"
            :deletion-title="$t('Terminate billing network')"
            :deletion-text="$t('You are about to delete billing network # {subject}')"
        />
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiBillingNetworks',
    components: {
        AuiDataTable
    },
    data () {
        return {
        }
    },
    computed: {
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
                    editable: true,
                    align: 'left',
                    component: 'input',
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
                    label: this.$t('Used (contracts)'),
                    field: 'contract_cnt',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'package_cnt',
                    label: this.$t('Used (packages)'),
                    field: 'package_cnt',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'blocks_grp',
                    label: this.$t('Network Blocks'),
                    field: 'blocks_grp',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
