<template>
    <div>
        <aui-data-table
            v-if="resourceObject"
            class="q-ma-lg"
            table-id="invoicetemplates"
            row-key="id"
            resource="invoicetemplates"
            resource-search-field="name"
            :resource-default-filters="{ reseller_id: resourceObject.id }"
            resource-base-path="invoicetemplates"
            resource-type="api"
            :resource-singular="$t('Invoice Template')"
            :resource-plural="$t('Invoice Templates')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="false"
            :row-deletable="() => true"
            deletion-action="resellers/ajaxDeleteInvoiceTemplate"
            deletion-subject="name"
            :show-header="true"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
        />
        <portal
            to="page-toolbar-left"
        >
            <aui-add-button
                class="q-mr-sm q-ml-xl"
                :disable="!createItemRoute"
                :to="createItemRoute"
            />
        </portal>
    </div>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiAddButton from 'components/buttons/AuiAddButton'
export default {
    name: 'AuiResellerDetailsInvoiceTemplates',
    components: { AuiAddButton, AuiDataTable },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        createItemRoute () {
            const resellerId = this.resourceObject?.id
            if (resellerId) {
                return { name: 'invoiceTemplateResellerCreate', params: { resellerId: resellerId } }
            } else {
                return null
            }
        },
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
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'invoiceTemplateEditInfo',
                'invoiceTemplateEditContent'
            ]
        }
    }
}
</script>
