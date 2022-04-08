<template>
    <aui-base-sub-context>
        <aui-data-table
            :table-id="resource + '-journal'"
            :resource="resource"
            :resource-path="'/' + resource + '/' + $route.params.id + '/journal'"
            resource-type="api"
            :resource-singular="resource + '-journal'"
            :title="resource"
            :columns="columns"
            :show-header="false"
            :searchable="true"
            :search-criteria-config="[
                {
                    criteria: 'username',
                    label: $t('Username')
                },
                {
                    criteria: 'operation',
                    label: $t('Operation')
                }
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subContext from 'src/mixins/sub-context'
import AuiDataTable from 'components/AuiDataTable'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        subContext
    ],
    props: {
        resource: {
            type: String,
            required: true
        }
    },
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'operation',
                    field: 'operation',
                    label: this.$t('Operation'),
                    align: 'left'
                },
                {
                    name: 'timestamp',
                    field: 'timestamp',
                    label: this.$t('Timestamp'),
                    align: 'left'
                },
                {
                    name: 'username',
                    field: 'username',
                    label: this.$t('Username'),
                    align: 'left'
                }
            ]
        }
    }
}
</script>
