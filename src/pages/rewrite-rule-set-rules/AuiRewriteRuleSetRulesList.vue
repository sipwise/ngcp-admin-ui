<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="rewriteRuleSetContext"
            ref="rewriteSetRulesTable"
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
            :use-api-v2="true"
            :resource-path="`rewrite-rules/sets/${rewriteRuleSetContext.id}/rules`"
            :resource-singular="$t('rewrite rule')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[addActionRoutes()]"
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
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { setDataTableDescending, setDataTableSortBy } from 'src/helpers/dataTable'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiRewriteRuleSetRulesList',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        rewriteRuleSetContextMixin
    ],
    props: {
        direction: {
            type: String,
            default: null
        },
        field: {
            type: String,
            default: null
        }
    },
    computed: {
        columns () {
            return [
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'match_pattern',
                    label: this.$t('Match Pattern'),
                    field: 'match_pattern',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'replace_pattern',
                    label: this.$t('Replacement Pattern'),
                    field: 'replace_pattern',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    editable: true,
                    align: 'left',
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Description must not be empty')
                        }
                    ]
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
            async handler () {
                if (this.$refs.rewriteSetRulesTable) {
                    await this.$refs.rewriteSetRulesTable.refresh({ force: true })
                }
            },
            deep: true,
            immediate: true
        }
    },
    mounted () {
        setDataTableSortBy({ tableId: `${this.$route.name}_rewriterules_rewriterules`, sortBy: 'priority' })
        setDataTableDescending({ tableId: `${this.$route.name}_rewriterules_rewriterules`, descending: false })
    },
    methods: {
        ...mapWaitingActions('rewriteRuleSets', {
            moveRewriteRuleDown: WAIT_PAGE,
            moveRewriteRuleUp: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (route?.name === 'rewriteRulesEdit') {
                route.params.id = this.rewriteRuleSetContext.id
                route.params.rewriteRuleId = row.id
            }
            return route
        },
        async moveUp (id) {
            const rewriteRuleSetId = this.rewriteRuleSetContext?.id
            await this.moveRewriteRuleUp({
                rewriteRuleSetId,
                rewriteRuleId: id,
                direction: this.direction,
                field: this.field
            })
        },
        async moveDown (id) {
            const rewriteRuleSetId = this.rewriteRuleSetContext?.id
            await this.moveRewriteRuleDown({
                rewriteRuleSetId,
                rewriteRuleId: id,
                direction: this.direction,
                field: this.field
            })
        },
        rowActions ({ row }) {
            return [
                'rewriteRulesEdit',
                {
                    id: 'rewriteRuleSetRuleUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.id)
                        await this.reloadDataContext('rewriteRulesContext')
                        this.$refs.rewriteSetRulesTable.refresh({ force: true })
                    }
                },
                {
                    id: 'rewriteRuleSetRuleDown',
                    color: 'primary',
                    icon: 'move_down',
                    label: this.$t('Move Down'),
                    visible: true,
                    click: async () => {
                        await this.moveDown(row.id)
                        await this.reloadDataContext('rewriteRulesContext')
                        this.$refs.rewriteSetRulesTable.refresh({ force: true })
                    }
                }
            ]
        },
        addActionRoutes () {
            let routeName = 'rewriteRules'
            if (this.direction === 'lnp') {
                routeName += 'Lnp'
            } else if (this.direction === 'in') {
                routeName += 'Inbound'
            } else {
                routeName += 'Outbound'
            }

            if (this.field === 'caller') {
                routeName += 'CallerCreation'
            } else {
                routeName += 'CalleeCreation'
            }
            return { name: routeName }
        }
    }
}
</script>
