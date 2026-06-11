<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="ccmapentries"
            row-key="id"
            resource="ccmapentries"
            resource-type="api"
            :resource-singular="$t('Callthrough CLI')"
            title=""
            :columns="columns"
            :searchable="false"
            :addable="false"
            :editable="false"
            :deletable="true"
            :show-more-menu="true"
            deletion-subject="id"
            :show-header="false"
            :resource-default-filters="resourceDefaultFilters"
            :use-client-side-filtering-and-pagination="true"
            data-request-action="subscribers/requestSubscriberCCmappings"
            deletion-action="subscribers/deleteSubscriberCCmapping"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    v-if="canEdit"
                    icon="edit"
                    :label="$t('Edit')"
                    :to="{ name: 'subscriberDetailsCallthroughClisEdit', params: { id: subscriberId }}"
                />
                <aui-list-action
                    v-if="canDelete"
                    icon="delete_sweep"
                    color="negative"
                    data-cy="aui-list-action--delete-all-ccmapentries"
                    :label="$t('Delete all')"
                    :disable="$waitPage($wait)"
                    @click.stop="confirmDeleteAll"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiListAction from 'components/AuiListAction'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import NegativeConfirmationDialog from 'src/components/dialog/NegativeConfirmationDialog'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallthroughCLIs',
    components: {
        AuiListAction,
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        subscriberId () {
            return this.$route.params.id
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'auth_key',
                    label: this.$t('CLI'),
                    field: 'auth_key',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'source_uuid',
                    label: this.$t('Source UUID'),
                    field: 'source_uuid',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        canEdit () {
            return this.$aclCan('update', 'entity.ccmapentries') && this.$aclCan('update', 'entity.subscribers')
        },
        canDelete () {
            return this.$aclCan('delete', 'entity.ccmapentries')
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            deleteAllSubscriberCCmappings: WAIT_PAGE
        }),
        resourceDefaultFilters ({ operation, row }) {
            if (operation === 'delete') {
                return {
                    subscriber_id: this.subscriberId,
                    auth_key: row.auth_key,
                    source_uuid: row.source_uuid,
                    _mapping_index: row._mapping_index
                }
            }

            return {
                subscriber_id: this.subscriberId
            }
        },
        confirmDeleteAll () {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t('Do you want to delete all Callthrough CLIs?'),
                    icon: 'delete_sweep',
                    text: this.$t('If you proceed all Callthrough CLIs will be deleted. Do you want to continue?'),
                    buttonIcon: 'delete_sweep',
                    buttonLabel: this.$t('Continue')
                }
            }).onOk(async () => {
                try {
                    await this.deleteAllSubscriberCCmappings(this.subscriberId)
                    showGlobalSuccessMessage(this.$t('Successfully updated ccmappings'))
                } catch (error) {
                    showGlobalErrorMessage(error)
                } finally {
                    await this.refresh()
                }
            })
        }
    }
}
</script>
