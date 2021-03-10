<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="resellers"
            row-key="id"
            resource="resellers"
            resource-search-field="name"
            resource-base-path="reseller"
            resource-type="api"
            resource-alt="reseller/ajax"
            resource-singular="reseller"
            resource-plural="resellers"
            :deletion-label="$t('Terminate')"
            :title="$t('Resellers')"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="true"
            deletion-subject="name"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
        >
            <template
                v-slot:actions="props"
            >
                <q-btn
                    v-if="$aclCan('create', 'entity.resellers')"
                    class="q-mr-xs"
                    icon="add"
                    color="primary"
                    unelevated
                    to="/reseller/create"
                    :disable="props.loading"
                    :label="$t('Add')"
                />
                <q-btn-dropdown
                    v-if="$aclCan('update', 'entity.resellers')"
                    class="q-mr-xs"
                    icon="edit"
                    color="primary"
                    unelevated
                    split
                    size="md"
                    :to="'/reseller/' + props.row.id + '/edit'"
                    :disable="props.loading || props.selected"
                    :label="$t('Edit')"
                >
                    <q-list
                        class="bg-white"
                    >
                        <aui-popup-menu-item
                            icon="article"
                            color="primary"
                            :to="'/reseller/' + props.row.id + '/details'"
                            :disable="props.loading || props.selected"
                            :label="$t('Details')"
                        />
                        <aui-popup-menu-item
                            icon="settings_applications"
                            color="primary"
                            :to="'/reseller/' + props.row.id + '/preferences'"
                            :disable="props.loading || props.selected"
                            :label="$t('Preferences')"
                        />
                    </q-list>
                </q-btn-dropdown>
            </template>
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    color="primary"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="'/reseller/' + props.row.id + '/edit'"
                />
                <aui-popup-menu-item
                    color="primary"
                    icon="article"
                    :label="$t('Details')"
                    :to="'/reseller/' + props.row.id + '/details'"
                />
                <aui-popup-menu-item
                    color="primary"
                    icon="settings_applications"
                    :label="$t('Preferences')"
                    :to="'/reseller/' + props.row.id + '/preferences'"
                />
            </template>
            <template
                v-slot:custom-component-contract_id="props"
            >
                <aui-popup-edit-contract
                    :label="props.row.contract_id + ''"
                    :value="props.row.contract_id"
                    @save="$refs.table.patchField('contract_id', $event.value, props)"
                />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiPopupEditContract from 'components/popup-edit/AuiPopupEditContract'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiPageResellers',
    components: {
        AuiPopupEditContract,
        AuiPopupMenuItem,
        AuiDataTable
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters('resellers', [
            'resellerStatusOptions'
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
                    name: 'contract_id',
                    label: this.$t('Contract'),
                    field: 'contract_id',
                    sortable: true,
                    editable: true,
                    component: 'custom',
                    componentField: 'contract_id',
                    componentOptionsGetter: 'contracts/filteredResellerOptions',
                    componentOptionsAction: 'contracts/filterContracts',
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    componentIcon: 'fas fa-user-tie',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Input must not be empty')
                        }
                    ],
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    editable: true,
                    component: 'select',
                    componentOptions: this.resellerStatusOptions,
                    align: 'left'
                },
                {
                    name: 'enable_rtc',
                    label: this.$t('WebRTC'),
                    field: 'enable_rtc',
                    sortable: true,
                    editable: true,
                    component: 'toggle',
                    align: 'left'
                }
            ]
        }
    }
}
</script>
