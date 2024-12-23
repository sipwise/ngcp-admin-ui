<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="billingProfilePackageContext"
            ref="table"
            table-id="package-underrun"
            resource="profilepackages"
            resource-base-path="package"
            resource-type="ajax"
            :resource-alt="resourceUrl"
            :resource-singular="$t('Underrun Billing Profiles/Networks')"
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
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiProfilePackagesDetailsUnderrun',
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
            return `package/${this.billingProfilePackageContext.id}/ajax/underrun_profiles/`
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
