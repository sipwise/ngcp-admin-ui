<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="speeddial"
            row-key="id"
            resource="speeddial"
            :resource-alt="tableResourcePath"
            resource-type="ajax"
            :resource-singular="$t('Speed Dial')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="false"
            :editable="false"
            :deletable="true"
            deletion-subject="id"
            :resource-default-filters="({ operation }) => { if (operation === 'delete') { return { subscriberId: subscriberContext.id } }}"
            deletion-action="subscribers/ajaxDeleteSpeedDial"
            :show-header="false"
            :show-more-menu="true"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    v-if="canEdit"
                    class="q-ml-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="{ name: 'subscriberDetailsSpeedDialEdit', params: { id: subscriberContext.id}}"
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
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import AuiListAction from 'components/AuiListAction'
export default {
    name: 'AuiSubscriberDetailsSpeedDial',
    components: {
        AuiBaseSubContext,
        AuiDataTable,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        tableResourcePath () {
            return `subscriber/${this.subscriberContext.id}/preferences/speeddial/ajax`
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'slot',
                    label: this.$t('Slot'),
                    field: 'slot',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'destination',
                    label: this.$t('Destination'),
                    field: 'destination',
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
