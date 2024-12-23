<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="domains"
            row-key="id"
            resource="domains"
            resource-search-field="domain"
            :resource-search-wildcard="true"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-type="api"
            :resource-singular="$t('Domain')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                {
                    name: 'domainCreation',
                    query: {
                        reseller_id: resourceObject.id
                    }
                }
            ]"
            :deletable="true"
            :deletion-extra-confirm="{
                text: $t('with {0} subscribers assigned. All those subscribers WILL BE DELETED TOO! Are you sure?'),
                items: [{
                    action: 'domain/fetchDomainSubscribersCount',
                    filter: 'domain',
                    filterValue: 'domain',
                    skipCheck: (value) => String(value) === '0'
                }]
            }"
            deletion-subject="domain"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'domain',
                    label: $t('Domain'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsDomain',
    components: {
        AuiBaseSubContext,
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
        }
    },
    methods: {
        rowActions () {
            return [
                'domainPreferences'
            ]
        }
    }
}
</script>
