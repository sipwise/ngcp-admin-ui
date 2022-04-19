<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            row-key="id"
            table-id="voicemails"
            resource="voicemails"
            resource-base-path="voicemails"
            :resource-default-filters="() => ({
                subscriber_id: resourceObject.id
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
        >
            <template
                v-slot:row-more-menu="props"
            >
                <aui-popup-menu-item
                    class="q-ml-sm"
                    icon="fas fa-download"
                    :label="$t('Download')"
                    @click="downloadVoicemail(props.row)"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import subContext from 'src/mixins/sub-context'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiSubscriberDetailsVoicemails',
    components: {
        AuiDataTable,
        AuiBaseSubContext,
        AuiPopupMenuItem
    },
    mixins: [
        dataTableColumn,
        subContext
    ],
    data () {
        return {
            startDate: null,
            endDate: null
        }
    },
    computed: {
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
        }
    }
}
</script>
