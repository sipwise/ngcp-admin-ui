<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="ccmapentries"
            row-key="id"
            resource="ccmapentries"
            :resource-alt="tableResourcePath"
            resource-type="ajax"
            :resource-singular="$t('Callthrough CLI')"
            title=""
            :columns="columns"
            :searchable="false"
            :addable="false"
            :editable="false"
            :deletable="true"
            :show-more-menu="true"
            deletion-subject="id"
            :show-header="false"
            :resource-default-filters="({ operation }) => { if (operation === 'delete') { return { subscriberId: subscriberContext.id } }}"
            deletion-action="subscribers/ajaxDeleteCallthroughCLI"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    v-if="canEdit"
                    class="q-ml-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="{ name: 'subscriberDetailsCallthroughClisEdit', params: { id: subscriberContext.id }}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiListAction from 'components/AuiListAction'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallthroughCLIs',
    components: {
        AuiListAction,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        tableResourcePath () {
            return `subscriber/${this.subscriberContext.id}/preferences/ccmappings/ajax`
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'auth_key',
                    label: this.$t('CLI'),
                    field: 'auth_key',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'source_uuid',
                    label: this.$t('Source UUID'),
                    field: 'source_uuid',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    }
}
</script>
