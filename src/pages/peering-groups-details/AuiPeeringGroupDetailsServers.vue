<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="peeringContext"
            table-id="peeringservers"
            row-key="id"
            resource="peeringservers"
            :resource-default-filters="() => ({
                group_id: peeringContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="peeringservers"
            resource-type="api"
            :resource-singular="$t('Peering Servers')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'peeringGroupDetailsServerCreation' }]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiPeeringGroupDetailsServer',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [peeringContextMixin],
    computed: {
        ...mapGetters('user', [
            'sipExternalSbc'
        ]),
        serverRouteList () {
            if (this.sipExternalSbc === null) {
                return [{
                    value: null,
                    label: this.$t('None')
                }]
            }

            return this.sipExternalSbc.map((item) => {
                return {
                    value: item,
                    label: item
                }
            })
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
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'ip',
                    label: this.$t('IP Address'),
                    field: 'ip',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'host',
                    label: this.$t('Hostname'),
                    field: 'host',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'port',
                    label: this.$t('Port'),
                    field: 'port',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'transport',
                    label: this.$t('Protocol'),
                    field: 'transport',
                    sortable: true,
                    align: 'left',
                    format: this.getProtocolLabel
                },
                {
                    name: 'weight',
                    label: this.$t('Weight'),
                    field: 'weight',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'via_route',
                    label: this.$t('Via Route Set'),
                    field: 'via_route',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.serverRouteList,
                    format: (value) => {
                        if (!value) {
                            return this.$t('None')
                        }
                        const exists = this.sipExternalSbc?.some((item) => item === value)
                        return exists ? value : this.$t('None')
                    }
                },
                {
                    name: 'probe',
                    label: this.$t('Probe'),
                    field: 'probe',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        getProtocolLabel (value) {
            const labels = {
                1: 'UDP',
                2: 'TCP',
                3: 'TLS'
            }
            return labels[value] || 'UDP'
        },
        rowActionRouteIntercept ({ route, row }) {
            const peeringId = this.peeringContext?.id
            if (_.includes(['peeringGroupServerEdit', 'peeringGroupServerPreferences'], route?.name)) {
                route.params.id = peeringId
                route.params.serverId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'peeringGroupServerEdit',
                'peeringGroupServerPreferences'
            ]
        }
    }
}
</script>
