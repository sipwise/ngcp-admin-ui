<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="ncoslevelContext"
            ref="numberPatternTab"
            table-id="ncospatterns"
            row-key="id"
            resource="ncospatterns"
            :resource-default-filters="() => ({
                ncos_level_id: ncoslevelContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="ncospatterns"
            resource-type="api"
            :resource-singular="$t('NCOS Number Patterns')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'ncosLevelsDetailsNumberPatternCreation' }]"
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
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
export default {
    name: 'AuiNCOSLevelsDetailsNumberPattern',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [ncoslevelContextMixin],
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
            route.params.id = this.ncoslevelContext.id
            route.params.numberPatternId = row.id
            return route
        },
        rowActions ({ row }) {
            return [
                'ncosLevelsDetailsNumberPatternEdit'
            ]
        }
    }
}
</script>
