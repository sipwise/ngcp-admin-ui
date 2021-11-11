<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            class="q-ma-lg"
            table-id="domains"
            row-key="id"
            resource="domains"
            resource-search-field="domain"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-base-path="domain"
            resource-type="api"
            resource-alt="domain/ajax"
            resource-singular="domain"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="false"
            :deletion-extra-confirm="{
                text: this.$t('with {0} subscribers assigned. All those subscribers WILL BE DELETED TOO! Are you sure?'),
                items: [{
                    action: 'domain/fetchDomainSubscribersCount',
                    filter: 'domain',
                    filterValue: 'domain',
                    skipCheck: (value) => String(value) === '0'
                }]
            }"
            deletion-subject="domain"
            :show-header="true"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
        />
    </div>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsAdmin',
    components: {
        AuiDataTable
    },
    data () {
        return {
        }
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
                    align: 'center'
                },
                {
                    name: 'domain',
                    label: this.$t('Domain'),
                    field: 'domain',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'domainPreferences'
            ]
        }
    }
}
</script>
