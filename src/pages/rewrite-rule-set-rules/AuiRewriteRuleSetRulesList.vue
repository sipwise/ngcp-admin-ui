<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="rewriteRuleSetContext"
            ref="dataTable"
            row-key="id"
            table-id="rewriterules"
            resource="rewriterules"
            resource-base-path="rewriterules"
            :resource-default-filters="() => ({
                set_id: rewriteRuleSetContext.id,
                direction: direction,
                field: field
            })"
            resource-type="api"
            :resource-singular="$t('rewrite rule')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'rewriteRulesCreation' }]"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :searchable="false"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import { required } from 'vuelidate/lib/validators'
import dataTableMixin from 'src/mixins/data-table'
export default {
    name: 'AuiRewriteRuleSetRulesList',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        rewriteRuleSetContextMixin,
        dataTableMixin
    ],
    props: {
        direction: {
            type: String,
            default: ''
        },
        field: {
            type: String,
            default: ''
        }
    },
    computed: {
        columns () {
            return [
                {
                    name: 'match_pattern',
                    label: this.$t('Match Pattern'),
                    field: 'match_pattern',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Match Pattern must not be empty')
                        }
                    ]
                },
                {
                    name: 'replace_pattern',
                    label: this.$t('Replacement Pattern'),
                    field: 'replace_pattern',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Replacement Pattern must not be empty')
                        }
                    ]
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'toggle'
                }
            ]
        }
    },
    watch: {
        $props: {
            handler () {
                this.refresh()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.rewriteRuleSetContext.id
            route.params.rewriteRuleId = row.id
            return route
        },
        rowActions () {
            return [
                'rewriteRulesEdit'
            ]
        }
    }
}
</script>
