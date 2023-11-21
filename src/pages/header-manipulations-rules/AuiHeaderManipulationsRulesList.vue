<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRuleSetContextContext"
            ref="dataTable"
            table-id="headerrules"
            row-key="id"
            resource="headerrules"
            resource-type="api"
            :resource-default-filters="() => ({
                set_id: headerRuleSetContextContext.id
            })"
            :resource-singular="$t('header manipulation')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRuleSetRulesCreate'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                },
                {
                    criteria: 'description',
                    label: $t('Description'),
                    component: 'input'
                }

            ]"
        >
            <template #row-more-menu="props">
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.headerrules')"
                    icon="move_up"
                    :label="$t('Move Up')"
                    @click="moveUp(props.row.id)"
                />
                <aui-popup-menu-item
                    v-if="$aclCan('update', 'entity.headerrules')"
                    icon="move_down"
                    :label="$t('Move Down')"
                    @click="moveDown(props.row.id)"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { numeric, required } from '@vuelidate/validators'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { WAIT_PAGE } from 'src/constants'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsRulesList',
    components: {
        AuiPopupMenuItem,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        headerRuleSetContextMixin
    ],
    computed: {
        ...mapGetters('headerRuleSets', [
            'directionOptions'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Priority must not be empty')
                        },
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Only digits are allowed')
                        }
                    ]
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'direction',
                    label: this.$t('Direction'),
                    field: 'direction',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.directionOptions
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
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
                    name: 'stopper',
                    label: this.$t('Stopper'),
                    field: 'stopper',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            headerRuleMoveUpDown: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['headerRuleSetRulesEdit', 'headerRuleSetRulesConditions', 'headerRuleSetRulesActions'], route?.name)) {
                route.params.id = this.headerRuleSetContextContext.id
                route.params.headeruleId = row.id
            }
            return route
        },
        async moveUp (id) {
            await this.headerRuleMoveUpDown({
                setId: this.headerRuleSetContextContext.id,
                headeruleId: id,
                move: 'up'
            })
            await this.refresh()
        },
        async moveDown (id) {
            await this.headerRuleMoveUpDown({
                setId: this.headerRuleSetContextContext.id,
                headeruleId: id,
                move: 'down'
            })
            await this.refresh()
        },
        rowActions () {
            return [
                'headerRuleSetRulesEdit',
                'headerRuleSetRulesConditions',
                'headerRuleSetRulesActions'
            ]
        }
    }
}
</script>
