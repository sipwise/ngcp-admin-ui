<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            row-key="id"
            table-id="voicemails"
            resource="voicemails"
            resource-base-path="voicemails"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-type="api"
            :resource-singular="$t('Voicemail')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="folder"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'folder',
                    label: $t('Folder'),
                    component: 'input'
                },
                {
                    criteria: 'caller',
                    label: $t('Caller'),
                    component: 'input'
                }
            ]"
            :addable="false"
            :editable="false"
            :deletable="true"
            :show-header="false"
            :row-actions="rowActions"
            :show-more-menu="true"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsVoicemails',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        subscriberContextMixin,
        subContext
    ],
    data () {
        return {
            startDate: null,
            endDate: null
        }
    },
    computed: {
        subscriberId () {
            return this.subscriberContext?.id
        },
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'folder',
                    label: this.$t('Folder'),
                    field: 'folder',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'caller',
                    label: this.$t('Caller'),
                    field: 'caller',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'time',
                    label: this.$t('Time'),
                    field: 'time',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'duration',
                    label: this.$t('Duration'),
                    field: 'duration',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            apiDownloadvoicemailRecording: WAIT_PAGE
        }),
        async downloadVoicemail (row) {
            await this.apiDownloadvoicemailRecording(row.id)
        },
        rowActions ({ row }) {
            return [
                {
                    id: 'subscriberDetailsDownloadVoicemail',
                    color: 'primary',
                    icon: 'fas fa-download',
                    label: this.$t('Download'),
                    visible: true,
                    click: () => {
                        this.downloadVoicemail(row)
                    }
                }
            ]
        }
    }
}
</script>
