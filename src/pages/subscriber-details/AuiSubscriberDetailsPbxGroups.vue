<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="pbxgroups"
            resource="subscribers"
            :title="$t('PBX Groups')"
            resource-type="api"
            :columns="columns"
            :rows-data="pbxGroupsData"
            :show-header="false"
            :show-more-menu="true"
            :resource-singular="$t('Pbx Group')"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            row-key="id"
            selection="none"
            :addable="false"
            :editable="false"
            :deletable="false"
            :searchable="false"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsPbxGroups',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        subscriberContextMixin
    ],
    computed: {
        ...mapGetters('customers', [
            'subscriberCommonPbxHuntPolicyOptions',
            'subscriberCommonPbxHuntCancelModeOptions'
        ]),
        pbxGroupsData () {
            return this.subscriberContextPbxGroups || []
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
                    name: 'display_name',
                    label: this.$t('Name'),
                    field: 'display_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'pbx_extension',
                    label: this.$t('Extension'),
                    field: 'pbx_extension',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'pbx_hunt_policy',
                    label: this.$t('Hunt Policy'),
                    field: 'pbx_hunt_policy',
                    editable: true,
                    sortable: true,
                    align: 'left',
                    component: 'select',
                    componentOptions: this.subscriberCommonPbxHuntPolicyOptions
                },
                {
                    name: 'pbx_hunt_timeout',
                    label: this.$t('Hunt Timeout'),
                    field: 'pbx_hunt_timeout',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'pbx_hunt_cancel_mode',
                    label: this.$t('Cancel Mode'),
                    field: 'pbx_hunt_cancel_mode',
                    editable: true,
                    sortable: true,
                    align: 'left',
                    component: 'select',
                    componentOptions: this.subscriberCommonPbxHuntCancelModeOptions
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberDetails',
                'subscriberEdit',
                'subscriberPreferences'
            ]
        }
    }
}
</script>
