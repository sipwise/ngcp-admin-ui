<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            row-key="timestamp"
            table-id="sipcaptures"
            resource="sipcaptures"
            resource-base-path="sipcaptures"
            :resource-default-filters="() => ({
                subscriber_id: resourceObject.id
            })"
            resource-type="api"
            :resource-singular="$t('sip capture')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="call_id"
            :resource-search-wildcard="false"
            :search-criteria-config="[
                {
                    criteria: 'call_id',
                    label: $t('Call-ID'),
                    component: 'input'
                },
                {
                    criteria: 'method',
                    label: $t('Method'),
                    component: 'input'
                }
            ]"
            :addable="false"
            :editable="true"
            :deletable="false"
            :show-header="false"
            :row-menu-route-names="[
                'subscriberDetailsCallMap'
            ]"
            :row-menu-route-intercept="({ route, row }) => {
                route.params.id = resourceObject.id
                route.params.callId = row['call_id']
                return route
            }"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiSubscriberDetailsCapturedDialogs',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        subContext
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'timestamp',
                    label: this.$t('Timestamp'),
                    field: 'timestamp',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'call_id',
                    label: this.$t('Call-ID'),
                    field: 'call_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'method',
                    label: this.$t('Method'),
                    field: 'cseq_method',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
