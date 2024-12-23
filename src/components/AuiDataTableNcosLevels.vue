<template>
    <aui-data-table
        v-if="ncosSet"
        ref="dataTable"
        table-id="ncossetslevels"
        resource="ncos"
        resource-path="ncoslevels"
        :resource-default-filters="ncosSet ? { reseller_id: ncosSet.reseller_id } : {}"
        resource-base-path="ncossetslevel"
        resource-search-field="level"
        data-cy="ncos-set-levels-list"
        :resource-search-wildcard="true"
        resource-type="api"
        :resource-singular="$t('NCOS Set Levels')"
        row-key="id"
        :title="$t('List of all NCOS Levels')"
        :columns="columns"
        :searchable="true"
        :editable="false"
        :show-header="true"
        :show-header-actions="false"
        :show-more-menu="true"
        :row-actions="rowActions"
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
import { WAIT_PAGE } from 'src/constants'
import dataContextPageMixin from 'src/mixins/data-context-page'
import dataTable from 'src/mixins/data-table'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiDataTableNcosLevels',
    components: {
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataContextPageMixin
    ],
    props: {
        ncosSet: {
            type: Object,
            default: undefined
        }
    },
    emits: ['on-add-new-level'],
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
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('ncosSets', {
            createNCOSSetLevel: WAIT_PAGE
        }),
        rowActions ({ row }) {
            return [
                {
                    id: 'addLevel',
                    color: 'primary',
                    icon: 'add',
                    label: this.$t('Add'),
                    visible: true,
                    click: async () => {
                        await this.createNCOSSetLevel({ id: this.ncosSet.id, level_id: row.id })
                        await this.reloadDataContext('ncosSetsContext')
                        this.$emit('on-add-new-level')
                    }
                }
            ]
        }
    }
}
</script>
