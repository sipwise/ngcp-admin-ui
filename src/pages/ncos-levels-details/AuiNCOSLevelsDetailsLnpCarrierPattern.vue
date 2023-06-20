<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="ncoslevelCarrierContext"
            ref="lnpCarrierPatternTab"
            table-id="ncoslnppatterns"
            row-key="id"
            resource="ncoslnppatterns"
            :resource-default-filters="() => ({
                ncos_lnp_list_id: ncoslevelCarrierContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="ncoslnppatterns"
            resource-type="api"
            :resource-singular="$t('LNP Patterns')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'ncosLevelsDetailsLnpCarrierPatternCreation' }]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'pattern',
                    label: $t('Pattern'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import ncoslevelCarrierContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrierPattern',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [ncoslevelCarrierContextMixin],
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
                    name: 'pattern',
                    label: this.$t('Pattern'),
                    field: 'pattern',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Pattern must not be empty')
                        }
                    ]
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.ncoslevelCarrierContext.id
            route.params.lnpCarrierPatternId = row.id
            return route
        },
        rowActions ({ row }) {
            return [
                'ncosLevelsDetailsLnpCarrierPatternEdit'
            ]
        }
    }
}
</script>
