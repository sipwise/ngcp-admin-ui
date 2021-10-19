<template>
    <div>
        <!-- TODO change resource-type to 'api' as soon as
            customerlocations endpoint can be filtered by customer_id -->
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
            table-id="customerlocations"
            row-key="id"
            resource="customerlocations"
            resource-search-field="name"
            resource-base-path="customerlocations"
            :resource-alt="resourceUrl"
            resource-type="ajax"
            :resource-singular="$t('location')"
            :resource-plural="$t('locations')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="false"
            :row-deletable="() => true"
            deletion-subject="name"
            :show-header="true"
            :show-header-actions="false"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
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
import _ from 'lodash'
import { mapState } from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiAddButton from 'components/buttons/AuiAddButton'
export default {
    name: 'AuiCustomerDetailsLocations',
    components: { AuiAddButton, AuiDataTable },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        createItemRoute () {
            const customerId = this.resourceObject?.id
            if (customerId) {
                return { name: 'customerLocationCreate', params: { customerId: customerId } }
            } else {
                return null
            }
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
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
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
        },
        resourceUrl () {
            return 'customer/' + this.resourceObject.id + '/location/ajax'
        },
        rowActionRouteNames () {
            return [
                'customerLocationPreferences',
                'customerLocationEdit'
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const customerId = this.resourceObject?.id
            if (_.includes(['customerLocationEdit', 'customerLocationPreferences'], route?.name)) {
                route.params.id = customerId
                route.params.locationId = row.id
            }
            return route
        }
    }
}
</script>
