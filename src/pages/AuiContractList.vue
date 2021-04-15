<template>
    <aui-page
        root-route="contractList"
        :loading="$wait.is('aui-data-table-*')"
    >
        <template
            v-slot:toolbar-left
        >
            <aui-add-dropdown-button
                v-if="$aclCan('create', 'entity.contracts')"
                class="q-mr-sm q-ml-xl"
                menu-anchor="bottom left"
                menu-self="top left"
            >
                <q-list>
                    <aui-popup-menu-item
                        :label="$t('Peering Contract')"
                        :to="{ name: 'contractCreatePeering' }"
                    />
                    <aui-popup-menu-item
                        :label="$t('Reseller Contract')"
                        :to="{ name: 'contractCreateReseller' }"
                    />
                </q-list>
            </aui-add-dropdown-button>
            <aui-edit-button
                v-if="$aclCan('update', 'entity.contracts')"
                class="q-mr-sm"
                :disable="rowsSelected && rowsSelected.length === 0"
                :to="(rowsSelected && rowsSelected.length > 0)?{ name: 'contractEdit', params: {
                    id: rowsSelected[0].id
                }}:undefined"
            />
            <aui-terminate-button
                v-if="$aclCan('delete', 'entity.contracts')"
                class="q-mr-sm"
                :disable="rowsSelected && rowsSelected.length === 0"
                @click="deleteSelectedRow()"
            />
        </template>
        <template
            v-slot:toolbar-right
        >
            <aui-input-search
                v-model="search"
                class="q-mr-sm"
                dense
                borderless
                clearable
            />
        </template>
        <aui-data-table
            ref="table"
            table-id="contracts"
            row-key="id"
            resource="contracts"
            resource-base-path="contract"
            resource-type="ajax"
            resource-alt="contract/ajax"
            resource-singular="contract"
            resource-plural="contracts"
            :deletion-label="$t('Terminate')"
            :title="$t('Contracts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="true"
            deletion-subject="id"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="false"
            @rows-selected="rowsSelectedEvent"
        >
            <template
                v-slot:actions="props"
            >
                <q-btn-dropdown
                    v-if="$aclCan('create', 'entity.contracts')"
                    class="q-mr-xs"
                    icon="add"
                    color="primary"
                    unelevated
                    size="md"
                    :disable="props.loading"
                    :label="$t('Add')"
                >
                    <q-list
                        class="bg-white"
                    >
                        <aui-popup-menu-item
                            icon="add"
                            color="primary"
                            :to="'/contract/peering/create'"
                            :disable="props.loading"
                            :label="$t('Add peering contract')"
                        />
                        <aui-popup-menu-item
                            icon="add"
                            color="primary"
                            :to="'/contract/reseller/create'"
                            :disable="props.loading"
                            :label="$t('Add reseller contract')"
                        />
                    </q-list>
                </q-btn-dropdown>
            </template>
        </aui-data-table>
    </aui-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiPage from 'pages/AuiPage'
import AuiEditButton from 'components/buttons/AuiEditButton'
import AuiInputSearch from 'components/input/AuiInputSearch'
import AuiTerminateButton from 'components/buttons/AuiTerminateButton'
import AuiAddDropdownButton from 'components/buttons/AuiAddDropdownButton'
export default {
    name: 'AuiContractList',
    components: {
        AuiAddDropdownButton,
        AuiTerminateButton,
        AuiInputSearch,
        AuiEditButton,
        AuiPage,
        AuiPopupMenuItem,
        AuiDataTable
    },
    data () {
        return {
            rowsSelected: [],
            search: ''
        }
    },
    computed: {
        ...mapState('contracts', [
            'statusOptions'
        ]),
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
                    name: 'external_id',
                    label: this.$t('External #'),
                    field: 'external_id',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'contact_email',
                    label: this.$t('Contact Email'),
                    field: 'contact_email',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-envelope',
                    componentField: 'contact_id',
                    componentOptionsGetter: 'contracts/filteredSystemContactsAsOptions',
                    componentOptionsAction: 'contracts/filterSystemContacts'
                },
                {
                    name: 'product_name',
                    label: this.$t('Product'),
                    field: 'product_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'billing_profile_name',
                    label: this.$t('Billing Profile'),
                    field: 'billing_profile_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.statusOptions
                }
            ]
        }
    },
    watch: {
        search () {
            this.$refs.table.triggerReload({
                tableFilter: this.search
            })
        }
    },
    methods: {
        rowsSelectedEvent (rows) {
            this.rowsSelected = rows
        },
        deleteSelectedRow () {
            this.$refs.table.confirmRowDeletion(this.rowsSelected[0])
        }
    }
}
</script>
