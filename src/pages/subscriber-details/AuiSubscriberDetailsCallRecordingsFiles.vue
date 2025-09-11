<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            table-id="callrecordingstreams"
            row-key="id"
            resource="callrecordingstreams"
            resource-base-path="callrecordingstreams"
            resource-type="api"
            :resource-default-filters="() => ({
                recording_id: subscriberRecordingFilesContextResourceId,
            })"
            :resource-singular="$t('Recorded files')"
            title=""
            :columns="columns"
            :searchable="true"
            :deletable="false"
            deletion-subject="id"
            :show-header="false"
            :show-audio-player="true"
            :show-button-transcript="true"
            selection="none"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'type',
                    label: $t('Type'),
                    component: 'input',
                    wildcard: false
                }
            ]"
        >
            <template
                #transcript="props"
            >
                <q-btn
                    size="md"
                    color="primary"
                    icon="description"
                    dense
                    flat
                    @click="openTranscript(props.row)"
                />
            </template>
            <template
                #audio="props"
            >
                <aui-audio-player
                    class="col"
                    :file-url="audioUrls[props.row.id]"
                    :hide-download-button="false"
                    @load="loadAudio(props.row.id)"
                    @download="download(props.row.id)"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>
<script>
import AuiAudioPlayer from 'components/AuiAudioPlayer'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiTranscriptDialog from 'src/components/dialog/AuiTranscriptDialog'
import { WAIT_PAGE } from 'src/constants'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallRecordingsFiles',
    components: {
        AuiBaseSubContext,
        AuiDataTable,
        AuiAudioPlayer
    },
    mixins: [
        dataTable,
        subscriberContextMixin
    ],
    data () {
        return {
            audioUrls: {}
        }
    },
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('ID'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'format',
                    label: this.$t('Format'),
                    field: 'format',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            fetchFile: WAIT_PAGE,
            downloadRecordingStream: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.recordedFileId = row.id
            return route
        },
        async loadAudio (rowId) {
            const blobUrl = await this.fetchFile({ streamId: rowId })
            this.audioUrls = {
                ...this.audioUrls,
                [rowId]: blobUrl
            }
        },
        openTranscript (row) {
            this.$q.dialog({
                component: AuiTranscriptDialog,
                componentProps: {
                    text: row.transcript,
                    status: row.transcript_status
                }
            })
        },
        async download (rowId) {
            await this.downloadRecordingStream(rowId)
        }
    }
}
</script>
