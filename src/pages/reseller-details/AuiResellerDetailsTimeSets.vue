<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            table-id="timesets"
            row-key="id"
            resource="timesets"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-type="api"
            :resource-singular="$t('Time Set')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsTimeSetCreation' }]"
            :deletable="true"
            deletion-subject="name"
            :show-header="false"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        >
            <template #row-more-menu="props">
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.timesets')"
                    icon="fas fa-download"
                    :label="$t('Download')"
                    @click="downloadTimeSet(props.row.id)"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState, mapActions } from 'vuex'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiResellerDetailsTimeSets',
    components: { AuiBaseSubContext, AuiPopupMenuItem, AuiDataTable },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapActions('timeSets', [
            'downloadTimeSet'
        ]),
        rowActions () {
            return [
                'timeSetEvents'
            ]
        }
    }
}
</script>
