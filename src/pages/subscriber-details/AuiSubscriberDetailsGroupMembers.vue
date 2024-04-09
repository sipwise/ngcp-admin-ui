<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="groupMembersTab"
            row-key="id"
            table-id="pbxgroupsmembers"
            resource="groupmembers"
            :title="$t('Group Members')"
            :resource-path="`pbx/groups/${subscriberContext.id}/members`"
            resource-type="api"
            :use-api-v2="true"
            :columns="columns"
            :show-header="false"
            :searchable="false"
            :row-actions="rowActions"
            selection="none"
            :addable="false"
            :editable="true"
            :deletable="false"
            :show-button-edit="false"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { formatGroupMember } from 'src/filters/resource'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsGroupMembers',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'subscriber_id',
                    label: this.$t('Id'),
                    field: 'subscriber_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'username',
                    label: this.$t('Group Member'),
                    field: 'username',
                    formatter: ({ row }) => formatGroupMember(row),
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            moveGroupMemberUp: WAIT_PAGE,
            moveGroupMemberDown: WAIT_PAGE
        }),
        async moveUp (groupMemberId) {
            await this.moveGroupMemberUp({
                groupMemberId: groupMemberId,
                subscriberId: this.subscriberContext.id
            })
        },
        async moveDown (groupMemberId) {
            await this.moveGroupMemberDown({
                groupMemberId: groupMemberId,
                subscriberId: this.subscriberContext.id
            })
        },
        rowActions ({ row }) {
            return [
                {
                    id: 'moveUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.subscriber_id)
                        this.$refs.groupMembersTab.refresh({ force: true })
                    }
                },
                {
                    id: 'moveDown',
                    color: 'primary',
                    icon: 'move_down',
                    label: this.$t('Move Down'),
                    visible: true,
                    click: async () => {
                        await this.moveDown(row.subscriber_id)
                        this.$refs.groupMembersTab.refresh({ force: true })
                    }
                }
            ]
        }
    }
}
</script>
