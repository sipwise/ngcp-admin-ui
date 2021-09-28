<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
            table-id="subscribers"
            row-key="id"
            resource="subscribers"
            resource-search-field="username"
            :resource-default-filters="() => ({ customer_id: resourceObject.id })"
            resource-type="api"
            :resource-singular="$t('Subscriber')"
            :resource-plural="$t('Subscribers')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="false"
            :row-deletable="() => true"
            deletion-subject="username"
            :show-header="true"
            :show-header-actions="false"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
        />
        <portal
            to="page-toolbar-left"
        >
            <aui-add-button
                class="q-mx-sm"
                :disable="!createItemRoute"
                :to="createItemRoute"
            />
        </portal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiAddButton from 'components/buttons/AuiAddButton'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiCustomerDetailsSubscribers',
    components: { AuiAddButton, AuiDataTable },
    mixins: [
        dataTableColumn
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        createItemRoute () {
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                return { name: 'subscriberCustomerCreate', params: { customerId: resellerId } }
            } else {
                return null
            }
        },
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
