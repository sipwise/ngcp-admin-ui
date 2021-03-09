<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="subscribers"
            row-key="id"
            resource="subscribers"
            resource-base-path="subscribers"
            resource-type="ajax"
            resource-alt="subscriber/ajax"
            resource-singular="subscriber"
            resource-plural="subscribers"
            :deletion-label="$t('Terminate')"
            :title="$t('Subscribers')"
            :columns="columns"
            :searchable="true"
            :deletable="true"
            deletion-subject="name"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
        >
            <template
                v-slot:actions="props"
            >
                <q-btn
                    class="q-mr-xs"
                    icon="article"
                    color="primary"
                    unelevated
                    size="md"
                    :to="'/subscriber/' + props.row.id + '/details'"
                    :disable="props.loading || props.selected"
                    :label="$t('Details')"
                />
                <q-btn
                    class="q-mr-xs"
                    icon="settings_applications"
                    color="primary"
                    unelevated
                    size="md"
                    :to="'/subscriber/' + props.row.id + '/preferences'"
                    :disable="props.loading || props.selected"
                    :label="$t('Preferences')"
                />
            </template>
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    color="primary"
                    icon="article"
                    :label="$t('Details')"
                    :to="'/subscriber/' + props.row.id + '/details'"
                />
                <aui-popup-menu-item
                    color="primary"
                    icon="settings_applications"
                    :label="$t('Preferences')"
                    :to="'/subscriber/' + props.row.id + '/preferences'"
                />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiPageSubscribers',
    components: {
        AuiDataTable,
        AuiPopupMenuItem
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
                    name: 'contract_id',
                    label: this.$t('Contract #'),
                    field: 'contract_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'contract_contact_email',
                    label: this.$t('Contact Email'),
                    field: 'contract_contact_email',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'username',
                    label: this.$t('Username'),
                    field: 'username',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'domain_domain',
                    label: this.$t('Domain'),
                    field: 'domain_domain',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'uuid',
                    label: this.$t('UUID'),
                    field: 'uuid',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'number',
                    label: this.$t('Number'),
                    field: 'number',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'provisioning_voip_subscriber_voip_subscriber_profile_name',
                    label: this.$t('Profile'),
                    field: 'provisioning_voip_subscriber_voip_subscriber_profile_name',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
