<template>
    <q-page
        class="q-pa-md"
    >
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
        >
            <template
                v-slot:actions="props"
            >
                <q-btn-dropdown
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
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiPageContracts',
    components: {
        AuiPopupMenuItem,
        AuiDataTable
    },
    data () {
        return {
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
    }
}
</script>
