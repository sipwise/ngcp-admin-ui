<template>
    <q-page
        class="q-pa-md"
    >
        <aui-data-table
            ref="table"
            table-id="globalcalllistsuppressions"
            row-key="id"
            resource="calllistsuppressions"
            resource-base-path="calllistsuppression"
            resource-type="ajax"
            resource-alt="calllistsuppression/ajax"
            :resource-singular="$t('global call list suppression')"
            :resource-plural="$t('global call list suppressions')"
            :title="$t('Global Call List Suppressions')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :deletable="true"
            :addable="false"
        >
            <template
                v-slot:actions="props"
            >
                <q-btn
                    class="q-mr-xs"
                    icon="add"
                    color="primary"
                    unelevated
                    :disable="props.loading"
                    :label="$t('Add')"
                    to="/calllistsuppression/create/"
                />
                <q-btn
                    class="q-mr-xs"
                    icon="download"
                    color="primary"
                    unelevated
                    :disable="props.loading"
                    type="a"
                    href="/calllistsuppression/download/"
                    target="blank"
                    :label="$t('Download')"
                />
                <q-btn
                    class="q-mr-xs"
                    icon="upload"
                    color="primary"
                    unelevated
                    :disable="props.loading"
                    to="/calllistsuppression/upload/"
                    :label="$t('Upload')"
                />
            </template>
        </aui-data-table>
    </q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
    name: 'AuiGlobalCallListSuppressions',
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
                    name: 'domain',
                    label: this.$t('Domain'),
                    field: 'domain',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'direction',
                    label: this.$t('Direction'),
                    field: 'direction',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'pattern',
                    label: this.$t('Pattern'),
                    field: 'pattern',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mode',
                    label: this.$t('Mode'),
                    field: 'mode',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'label',
                    label: this.$t('Label'),
                    field: 'label',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
