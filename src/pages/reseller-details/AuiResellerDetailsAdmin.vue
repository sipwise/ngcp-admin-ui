<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="admins"
            row-key="id"
            resource="admins"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-base-path="administrator"
            resource-type="api"
            resource-search-field="login"
            :resource-search-wildcard="true"
            :resource-singular="$t('Administrator')"
            :title="$t('Administrator Logins')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'adminCreation' }]"
            :deletable="true"
            deletion-subject="login"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'login',
                    label: $t('Login'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiResellerDetailsAdmin',
    components: {
        AuiBaseSubContext,
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
