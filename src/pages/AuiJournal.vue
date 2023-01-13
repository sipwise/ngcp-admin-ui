<template>
    <q-splitter
        :value="splitterSize"
    >
        <template
            v-if="selectedRows.length === 2"
            #after
        >
            <aui-diff-view
                v-if="selectedRows.length === 2"
                class="q-pa-lg"
                :old-object="selectedRows[0].content"
                :new-object="selectedRows[1].content"
            />
        </template>
        <template
            #before
        >
            <aui-data-table
                ref="dataTable"
                :table-id="dataTableResourcePath"
                resource="journals"
                :resource-path="dataTableResourcePath"
                :resource-singular="dataTableResourcePath"
                resource-type="api"
                title=""
                :editable="false"
                :addable="false"
                :deletable="false"
                :columns="columns"
                :show-header="false"
                :searchable="true"
                :resource-default-filters="() => {
                    if (resourceId && !useV2) {
                        return {
                            resource_id: resourceId
                        }
                    }
                }"
                :resource-search-wildcard="true"
                :search-criteria-config="[
                    {
                        criteria: 'username',
                        label: $t('Username'),
                        wildcard: true
                    },
                    {
                        criteria: 'operation',
                        label: $t('Operation'),
                        wildcard: true
                    },
                    {
                        criteria: 'resource_id',
                        label: $t('Resource ID'),
                        wildcard: false
                    },
                    {
                        criteria: 'reseller_id',
                        label: $t('Reseller ID'),
                        wildcard: false
                    },
                    {
                        criteria: 'tx_id',
                        label: $t('TX ID'),
                        wildcard: false
                    },
                    {
                        criteria: 'id',
                        label: $t('ID'),
                        wildcard: false
                    }
                ]"
                :max-selected-rows="2"
                @select="selectedRows=$event"
            />
        </template>
    </q-splitter>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import dataTableMixin from 'src/mixins/data-table'
import AuiDiffView from 'components/AuiDiffView'
import { date } from 'quasar'
export default {
    name: 'AuiJournal',
    components: { AuiDiffView, AuiDataTable },
    mixins: [
        dataTableMixin
    ],
    props: {
        resource: {
            type: String,
            required: true
        },
        resourceId: {
            type: [String, Number],
            default: undefined
        },
        useV2: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        splitterSize () {
            if (this.selectedRows.length === 2) {
                return 70
            } else {
                return 100
            }
        },
        dataTableResourcePath () {
            let journal
            if (this.useV2) {
                journal = 'v2/journals/' + this.resource
                if (this.resourceId) {
                    journal += '/' + this.resourceId
                }
            } else {
                journal = 'journals/' + this.resource
            }
            return journal
        },
        columns () {
            return [
                {
                    name: 'id',
                    field: 'id',
                    label: this.$t('ID'),
                    align: 'left'
                },
                {
                    name: 'reseller_name',
                    field: 'reseller_id_expand.name',
                    label: this.$t('Reseller'),
                    align: 'left',
                    expand: 'reseller_id',
                    formatter: ({ row }) => {
                        if (row.reseller_id) {
                            return '#' + row.reseller_id + ' - ' + row.reseller_id_expand.name
                        } else {
                            return row.reseller_id_expand.name
                        }
                    }
                },
                {
                    name: 'username',
                    field: 'username',
                    label: this.$t('Username'),
                    align: 'left'
                },
                {
                    name: 'role_id',
                    field: 'role_id',
                    label: this.$t('Role'),
                    align: 'left'
                },
                {
                    name: 'operation',
                    field: 'operation',
                    label: this.$t('Operation'),
                    align: 'left'
                },
                {
                    name: 'resource_id',
                    field: 'resource_id',
                    label: this.$t('Resource ID'),
                    align: 'left'
                },
                {
                    name: 'timestamp',
                    field: 'timestamp',
                    label: this.$t('Timestamp'),
                    align: 'left',
                    formatter: ({ row }) => {
                        const timestamp = Number(row.timestamp.replace('.', ''))
                        return date.formatDate(timestamp, 'YYYY-MM-DD HH:mm:ss.SSS')
                    }
                },
                {
                    name: 'content',
                    field: 'content',
                    label: this.$t('Content'),
                    component: 'json',
                    componentField: 'content',
                    align: 'left'
                },
                {
                    name: 'tx_id',
                    field: 'tx_id',
                    label: this.$t('TX ID'),
                    align: 'left'
                }
            ]
        }
    }
}
</script>
