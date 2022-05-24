<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="subscribers"
            row-key="id"
            resource="subscribers"
            resource-search-field="username"
            :resource-search-wildcard="true"
            :resource-default-filters="() => ({
                customer_id: resourceObject.id,
                is_pbx_group: 0
            })"
            resource-type="api"
            :resource-singular="$t('Subscriber')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerSubscriberCreate' }]"
            :deletable="true"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="username"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'profile_id',
                    label: $t('Subscriber Profile ID'),
                    component: 'input'
                },
                {
                    criteria: 'username',
                    label: $t('Username'),
                    component: 'input'
                },
                {
                    criteria: 'webusername',
                    label: $t('Webusername'),
                    component: 'input'
                },
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                },
                {
                    criteria: 'customer_id',
                    label: $t('Customer ID'),
                    component: 'input'
                },
                {
                    criteria: 'customer_external_id',
                    label: $t('Customer External ID'),
                    component: 'input'
                },
                {
                    criteria: 'subscriber_external_id',
                    label: $t('Subscriber External ID'),
                    component: 'input'
                },
                {
                    criteria: 'alias',
                    label: $t('Alias'),
                    component: 'input'
                },
                {
                    criteria: 'reseller_id',
                    label: $t('Reseller ID'),
                    component: 'input'
                },
                {
                    criteria: 'contact_id',
                    label: $t('Contact ID'),
                    component: 'input'
                },
                {
                    criteria: 'primary_number',
                    label: $t('Primary Number'),
                    component: 'input'
                },
                {
                    criteria: 'pbx_extension',
                    label: $t('PBX Extension'),
                    component: 'input'
                },
                {
                    criteria: 'display_name',
                    label: $t('Display Name'),
                    component: 'input'
                },
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import { mapState } from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiCustomerDetailsSubscribers',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'username',
                    sortable: true,
                    align: 'left'
                },
                ...((this.resourceObject?.type === 'sipaccount') ? [
                    this.getDomainColumn(),
                    this.getPhoneNumberColumn()
                ] : [
                    this.getPbxExtension()
                ])

            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'subscriberDetails',
                'subscriberPreferences'
            ]
        }
    }
}
</script>
