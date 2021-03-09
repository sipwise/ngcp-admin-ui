<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="contacts"
            row-key="id"
            resource="customercontacts"
            resource-base-path="contact"
            resource-type="ajax"
            resource-alt="contact/ajax"
            resource-singular=""
            resource-plural=""
            :row-resource="(row) => { return row.reseller_name ? 'customercontacts' : 'systemcontacts' }"
            :title="$t('Contacts')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="true"
            :row-deletable="(row) => !!row.reseller_name"
            deletion-subject="email"
            deletion-title-i18n-key="Delete {resource}"
            deletion-text-i18n-key="You are about to delete {resource} {subject}"
        >
            <template
                v-slot:actions="props"
            >
                <q-btn
                    class="q-mr-xs"
                    icon="add"
                    color="primary"
                    unelevated
                    size="md"
                    :to="'/contact/create'"
                    :disable="props.loading"
                    :label="$t('Add')"
                />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
    name: 'AuiPageContact',
    components: {
        AuiDataTable
    },
    data () {
        return {
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
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    editable: props => !!props.row.reseller_name,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers',
                    align: 'left'
                },
                {
                    name: 'firstname',
                    label: this.$t('First Name'),
                    field: 'firstname',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'lastname',
                    label: this.$t('Last Name'),
                    field: 'lastname',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'company',
                    label: this.$t('Company'),
                    field: 'company',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'email',
                    label: this.$t('Email'),
                    field: 'email',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                }
            ]
        }
    }
}
</script>
