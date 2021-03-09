<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="subscriberprofiles"
            row-key="id"
            resource="subscriberprofilesets"
            resource-base-path="subscriberprofile"
            resource-type="ajax"
            resource-alt="subscriberprofile/ajax"
            :resource-singular="$t('subscriber profile set')"
            :resource-plural="$t('subscriber profile sets')"
            :title="$t('Subscriber Profile Sets')"
            :columns="columns"
            :editable="true"
            :addable="true"
            :searchable="true"
            :deletable="true"
            deletion-subject="id"
            deletion-title-i18n-key="Delete {resource}"
            deletion-text-i18n-key="You are about to delete {resource} {subject}"
        >
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    color="primary"
                    icon="content_copy"
                    :label="$t('Clone')"
                    :to="'/subscriberprofile/' + props.row.id + '/clone'"
                />
                <aui-popup-menu-item
                    color="primary"
                    icon="list"
                    :label="$t('Profiles')"
                    :to="'/subscriberprofile/' + props.row.id + '/profile'"
                />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiPageSubscriberProfileSet',
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
                    name: 'reseller_name',
                    label: this.$t('Reseller'),
                    field: 'reseller_name',
                    sortable: true,
                    editable: true,
                    component: 'select-lazy',
                    componentIcon: 'fas fa-user-tie',
                    componentField: 'reseller_id',
                    componentOptionsGetter: 'resellers/filteredResellerOptions',
                    componentOptionsAction: 'resellers/filterResellers',
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    editable: true,
                    component: 'input',
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
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
