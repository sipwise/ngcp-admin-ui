<template>
    <aui-data-table
        :key="defaultFilter"
        ref="dataTable"
        table-id="emailtemplates"
        row-key="id"
        resource="emailtemplates"
        resource-base-path="emailtemplates"
        resource-type="api"
        :resource-default-filters="defaultFilter"
        :resource-singular="$t('Email Template')"
        :title="$t('Email Templates')"
        :columns="columns"
        :searchable="true"
        :editable="true"
        :addable="true"
        :add-action-routes="[{ name: 'emailTemplateCreation' }]"
        :deletable="true"
        :show-header="false"
        :deletion-label="$t('Delete')"
        :deletion-text="'You are about to delete Template # {subject}'"
        deletion-subject="id"
        :row-menu-route-intercept="rowActionRouteIntercept"
        :row-actions="rowActions"
        :search-criteria-config="[
            {
                criteria: 'name',
                label: $t('Name'),
                component: 'input',
            }
        ]"
    />
</template>

<script>
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'

export default {
    name: 'AuiEmailTemplatesList',
    components: { AuiDataTable },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    props: {
        showCustom: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    ...this.expandedResellerNameColumn,
                    editable: false,
                    sortable: true

                },
                this.getNameColumn(),
                {
                    name: 'from_email',
                    label: this.$t('From'),
                    field: 'from_email',
                    sortable: true,
                    align: 'left',
                    editable: true
                },
                {
                    name: 'subject',
                    label: this.$t('Subject'),
                    field: 'subject',
                    sortable: true,
                    align: 'left',
                    editable: true
                }
            ]
        },
        defaultFilter () {
            return this.showCustom === true ? { reseller_id: '$not_null' } : { reseller_id: '$null' }
        }
    },
    methods: {
        rowActions () {
            return this.showCustom
                ? ['emailTemplateEditCustom']
                : ['emailTemplateEditDefault']
        },
        rowActionRouteIntercept ({ route, row }) {
            if (row) {
                route.params.id = row.id
            }
            return route
        }
    }
}
</script>
