<template>
    <aui-data-table
        v-if="ncosSet"
        ref="dataTable"
        table-id="ncossetslevelsselected"
        resource="ncos"
        :use-api-v2="true"
        :resource-path="'ncos/sets/' + ncosSet.id + '/levels'"
        resource-base-path="ncossetslevelselected"
        resource-search-field="level"
        data-cy="ncos-set-levels-selected"
        :resource-search-wildcard="true"
        resource-type="api"
        :resource-singular="$t('NCOS Set Levels')"
        row-key="id"
        :title="$t('Selected NCOS Levels')"
        :columns="columns"
        :searchable="true"
        :editable="false"
        :deletable="true"
        :show-more-menu="true"
        :show-header="true"
        :show-header-actions="false"
        deletion-subject="id"
        selection="none"
        :search-criteria-config="[
            {
                criteria: 'level',
                label: $t('Level Name'),
                component: 'input'
            }
        ]"
        v-bind="$attrs"
    />
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
    name: 'AuiDataTableSelectedNcosLevels',
    components: {
        AuiDataTable
    },
    props: {
        ncosSet: {
            type: Object,
            default: undefined
        }
    },
    computed: {
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
                    name: 'level',
                    label: this.$t('Level Name'),
                    field: 'level',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'level_id',
                    label: this.$t('Level Id'),
                    field: 'level_id',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        refresh () {
            this.$refs.dataTable.refresh({ force: true })
        }
    }
}
</script>
