<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="billingProfilePackageContext"
            ref="table"
            table-id="package-topup"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Top-up Billing Profiles/Networks')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="false"
            :deletable="false"
            :editable="false"
            :show-header="false"
            selection="none"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
export default {
    name: 'AuiProfilePackagesDetailsTopup',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        billingProfilePackageContextMixin
    ],
    computed: {
        resourceUrl () {
            return 'package/' + this.billingProfilePackageContext.id + '/ajax/topup_profiles/'
        },
        columns () {
            return [
                {
                    name: 'billing_profile_name',
                    label: this.$t('Billing Profile'),
                    field: 'billing_profile_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'billing_network_name',
                    label: this.$t('Billing Network'),
                    field: 'billing_network_name',
                    sortable: true,
                    align: 'left'
                }

            ]
        }
    }
}
</script>
