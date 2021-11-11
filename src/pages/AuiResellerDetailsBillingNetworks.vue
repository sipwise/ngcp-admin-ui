<template>
    <aui-base-sub-context>
        <!-- TODO using "ajax" instead of "api" due to missing contract_cnt and package_cnt -->
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="network"
            row-key="id"
            resource="billingnetworks"
            resource-base-path="network"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Network')"
            title=""
            :columns="columns"
            :addable="false"
            :show-more-menu-search="false"
            :show-header-actions="false"
            :searchable="true"
            :editable="true"
            :deletable="true"
            :row-deletable="(row) => row.contract_cnt < 1 && row.package_cnt < 1"
            :deletion-label="$t('Terminate')"
            deletion-subject="id"
            :deletion-title="$t('Terminate billing network')"
            :deletion-text="$t('You are about to delete billing network # {subject}')"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiResellerDetailsBillingNetworks',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        resourceUrl () {
            return 'network/ajax/filter_reseller/' + this.resourceObject.id
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
