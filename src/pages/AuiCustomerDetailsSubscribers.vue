<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="subscribers"
            row-key="id"
            resource="subscribers"
            resource-search-field="username"
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
            :row-menu-route-names="rowActionRouteNames"
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
        },
        rowActionRouteNames () {
            return [
                'subscriberDetails',
                'subscriberPreferences'
            ]
        }
    }
}
</script>
