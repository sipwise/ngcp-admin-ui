<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="autoattendants"
            row-key="id"
            resource="autoattendants"
            :resource-alt="tableResourcePath"
            resource-type="ajax"
            :resource-singular="$t('Auto Attendant Slots')"
            title=""
            :columns="columns"
            :searchable="true"
            :addable="false"
            :editable="false"
            :deletable="true"
            :show-more-menu="true"
            deletion-subject="id"
            :resource-default-filters="({ operation }) => { if (operation === 'delete') { return { subscriberId: subscriberContext.id } }}"
            deletion-action="subscribers/ajaxDeleteAutoAttendant"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'slot',
                    label: $t('Slot'),
                    component: 'input'
                },
                {
                    criteria: 'description',
                    label: $t('Description'),
                    component: 'input'
                }
            ]"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    v-if="canEdit"
                    class="q-ml-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="{ name: 'AuiSubscriberDetailsAutoAttendantEdit', params: { id: subscriberContext.id}}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiSubscriberDetailsAutoAttendant',
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
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        },
        tableResourcePath () {
            return `subscriber/${this.subscriberContext.id}/preferences/autoattendant/ajax`
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'choice',
                    label: this.$t('Slot'),
                    field: 'choice',
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
        }
    }
}
</script>
