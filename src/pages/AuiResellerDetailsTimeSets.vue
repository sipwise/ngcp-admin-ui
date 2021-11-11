<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
            table-id="timesets"
            row-key="id"
            resource="timesets"
            resource-search-field="name"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-base-path="timesets"
            resource-type="api"
            :resource-singular="$t('Time Set')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="false"
            :row-deletable="() => true"
            deletion-subject="name"
            :show-header="true"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
            :row-menu-route-intercept="rowActionRouteIntercept"
        >
            <template v-slot:row-more-menu="props">
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.timesets')"
                    icon="fas fa-download"
                    :label="$t('Download')"
                    @click="downloadTimeSet(props.row.id)"
                />
            </template>
        </aui-data-table>
        <portal
            to="page-toolbar-left"
        >
            <aui-add-button
                class="q-mr-sm q-ml-xl"
                :disable="!createItemRoute"
                :to="createItemRoute"
            />
        </portal>
    </div>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState, mapActions } from 'vuex'
import AuiAddButton from 'components/buttons/AuiAddButton'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiResellerDetailsTimeSets',
    components: { AuiPopupMenuItem, AuiAddButton, AuiDataTable },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        createItemRoute () {
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                return { name: 'timeSetResellerCreate', params: { resellerId: resellerId } }
            } else {
                return null
            }
        },
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
        },
        rowActionRouteNames () {
            return [
                'timeSetResellerEdit',
                'timeSetEvents'
            ]
        }
    },
    methods: {
        ...mapActions('timeSets', [
            'downloadTimeSet'
        ]),
        rowActionRouteIntercept ({ route, row }) {
            const resellerId = this.resourceObject?.id
            if (route?.name === 'timeSetResellerEdit') {
                route.params.resellerId = resellerId
            }
            return route
        }
    }
}
</script>
