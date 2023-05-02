<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="headerrules"
            row-key="id"
            resource="headerrules"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-type="api"
            :resource-singular="$t('header manipulation')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :add-action-routes="[{ name: 'subscriberHeaderRuleCreate'}]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
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
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { numeric, required } from '@vuelidate/validators'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { WAIT_PAGE } from 'src/constants'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiResellerDetailsDomain',
    components: {
        AuiPopupMenuItem,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
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
            headerRuleSetMoveUpDown: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.headerId = row.id
            return route
        },
        async moveUp (id) {
            await this.headerRuleSetMoveUpDown({
                subscriberId: this.subscriberContext.id,
                headerId: id,
                move: 'up'
            })
            await this.refresh()
        },
        async moveDown (id) {
            await this.headerRuleSetMoveUpDown({
                subscriberId: this.subscriberContext.id,
                headerId: id,
                move: 'down'
            })
            await this.refresh()
        },
        rowActions () {
            return [
                'subscriberHeaderRuleEdit',
                'subscriberHeaderRuleConditions',
                'subscriberHeaderRuleActions'
            ]
        }
    }
}
</script>
