<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="dataTable"
            table-id="ccmapentries"
            row-key="id"
            resource="ccmapentries"
            :resource-alt="tableResourcePath"
            resource-type="ajax"
            :resource-singular="$t('Calltrhough CLI')"
            title=""
            :columns="columns"
            :searchable="false"
            :addable="false"
            :editable="false"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :resource-default-filters="({ operation }) => { if (operation === 'delete') { return { subscriberId: resourceObject.id } }}"
            deletion-action="subscribers/ajaxDeleteCallthroughCLI"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-ml-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="{ name: 'subscriberDetailsCallthroughClisEdit', params: { id: resourceObject.id }}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subContext from 'src/mixins/sub-context'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiListAction from 'components/AuiListAction'
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
        subContext
    ],
    computed: {
        tableResourcePath () {
            return `subscriber/${this.resourceObject.id}/preferences/ccmappings/ajax`
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
        }
    }
}
</script>
