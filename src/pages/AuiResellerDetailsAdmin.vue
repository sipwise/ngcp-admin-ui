<template>
    <div>
        <q-linear-progress
            v-if="!resourceObject || tableLoading"
            indeterminate
            size="2px"
        />
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            class="q-ma-lg"
            table-id="admins"
            row-key="id"
            resource="admins"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-base-path="administrator"
            resource-type="api"
            resource-alt="administrator/ajax"
            :resource-singular="$t('Administrator')"
            :row-resource="(row) => {
                return 'admins'
            }"
            :title="$t('Administrator Logins')"
            :columns="columns"
            :searchable="false"
            :editable="true"
            :addable="false"
            :deletable="true"
            deletion-subject="login"
            :show-header="false"
        />
    </div>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiResellerDetailsAdmin',
    components: {
        AuiDataTable
    },
    mixins: [
        dataTableColumn
    ],
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
                this.getIdColumn(),
                this.getAdminLoginColumn(this.$t('Name'), 'name'),
                this.getAdminIsMasterColumn(),
                this.getAdminIsActiveColumn(),
                this.getAdminReadOnlyColumn(),
                this.getAdminShowPasswordColumn(),
                this.getAdminCallDataColumn(),
                this.getAdminBillingDataColumn()
            ]
        },
        tableLoading () {
            return this.$wait.is('aui-data-table-admins*')
        }
    }
}
</script>
