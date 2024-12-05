<template>
    <q-list>
        <q-item
            v-for="(item) of greetingFields"
            :key="item.type"
        >
            <q-item-section>
                <aui-sound-file-upload
                    :key="item.type"
                    :disable="!canUse || loading || item.loading"
                    :loading="item.loading"
                    :label="item.label"
                    delete-label=" "
                    icon="music_note"
                    file-types=".wav"
                    :value="item.stateLabel"
                    :uploaded="item.isCustomGreeting"
                    :uploading="item.uploading"
                    :uploading-progress="item.uploadingProgress"
                    :player-file-url="item.playerFileUrl"
                    @player-load-file="(formats) => loadGreeting(item.id, item.type, formats)"
                    @delete="deleteGreeting(item.id, item.type)"
                    @upload="(file) => uploadGreeting({ file, type: item.type, id: item.id })"
                    @abort="abortUploading(item.type)"
                    @download="downloadGreeting(item.id, item.type)"
                />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import {
    mapState
} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiSoundFileUpload from 'components/input/AuiSoundFileUpload'
import { WAIT_PAGE } from 'src/constants'
import { apiCreateCancelObject, apiIsCanceledRequest } from 'src/api/ngcpAPI'
import { markErrorAsHandled } from 'src/helpers/errorHandling'

export default {
    name: 'AuiSubscriberVoicemailGreetings',
    components: { AuiSoundFileUpload },
    props: {
        subscriberId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            greetingFilesUrls: {},
            uploadingProgress: {},
            uploadCancelActions: {}
        }
    },
    computed: {
        ...mapState('subscribers', [
            'voicemailGreetings'
        ]),
        loading () {
            return this.$waitPage(this.$wait)
        },
        greetingFields () {
            return [
                {
                    type: 'unavail',
                    label: this.$t('Voicemail greeting "Unavailable"')
                },
                {
                    type: 'busy',
                    label: this.$t('Voicemail greeting "Busy"')
                },
                {
                    type: 'temp',
                    label: this.$t('Voicemail greeting "Temp"')
                },
                {
                    type: 'greet',
                    label: this.$t('Voicemail greeting "Greet"')
                }
            ].map(item => {
                const greetingInfo = this.getGreetingObjByType(item.type)
                return {
                    ...item,
                    playerFileUrl: this.greetingFilesUrls[item.type],
                    id: greetingInfo?.id,
                    isCustomGreeting: !!greetingInfo?.id,
                    stateLabel: greetingInfo?.id ? this.$t('Custom sound') : this.$t('Default sound'),
                    uploading: this.$wait.is(this.getWaitIdentifierUpload(item.type)),
                    uploadingProgress: this.uploadingProgress[item.type],
                    loading: this.$wait.is('subscriber-greeting-*' + item.type)
                }
            })
        },
        canUse () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    watch: {
        async subscriberId () {
            await this.reload()
        }
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadVoicemailGreetings: WAIT_PAGE,
            loadVoicemailGreetingFile: WAIT_PAGE,
            deleteVoicemailGreeting: WAIT_PAGE,
            uploadVoicemailGreeting: WAIT_PAGE,
            downloadVoicemailGreetingFile: WAIT_PAGE
        }),
        async reload () {
            if (this.subscriberId) {
                this.greetingFilesUrls = {}
                this.uploadingProgress = {}
                await this.loadVoicemailGreetings(this.subscriberId)
            }
        },
        getGreetingObjByType (type) {
            return (this.voicemailGreetings || []).filter(item => item.dir === type).pop()
        },
        getGreetingIdByType (type) {
            const greetingItem = this.getGreetingObjByType(type)
            return greetingItem?.id
        },
        async loadGreeting (id, type, formats) {
            if (!this.greetingFilesUrls[type]) {
                const loadWaitIdentifier = this.getWaitIdentifierLoad(type)
                this.$wait.start(loadWaitIdentifier)
                try {
                    const format = formats.includes('mp3') ? 'mp3' : (formats.includes('ogg') ? 'ogg' : 'vaw')
                    const fileUrl = await this.loadVoicemailGreetingFile({ id, format })
                    this.greetingFilesUrls[type] = fileUrl
                } finally {
                    this.$wait.end(loadWaitIdentifier)
                }
            }
        },
        async deleteGreeting (id, type) {
            const deleteWaitIdentifier = this.getWaitIdentifierDelete(type)
            this.$wait.start(deleteWaitIdentifier)
            try {
                await this.deleteVoicemailGreeting(id)
                await this.loadVoicemailGreetings(this.subscriberId)
            } finally {
                this.$wait.end(deleteWaitIdentifier)
            }
        },
        async uploadGreeting ({ file, type, id }) {
            this.uploadingProgress[type] = 0
            const onProgress = (s) => {
                this.uploadingProgress[type] = s
            }

            const cancelToken = apiCreateCancelObject()
            this.uploadCancelActions[type] = cancelToken.cancel

            const uploadWaitIdentifier = this.getWaitIdentifierUpload(type)
            this.$wait.start(uploadWaitIdentifier)
            try {
                await this.uploadVoicemailGreeting({
                    data: { file, type, id, subscriber_id: this.subscriberId },
                    onProgress,
                    cancelToken: cancelToken.token
                })
                await this.loadVoicemailGreetings(this.subscriberId)
            } catch (e) {
                if (apiIsCanceledRequest(e)) {
                    markErrorAsHandled(e)
                } else {
                    throw e
                }
            } finally {
                this.$wait.end(uploadWaitIdentifier)
                this.uploadCancelActions[type] = undefined
            }
        },
        abortUploading (type) {
            const cancelFunction = this.uploadCancelActions[type]
            if (typeof cancelFunction === 'function') {
                cancelFunction()
            }
        },
        async downloadGreeting (id, type) {
            const fileName = `voicemail_${type}_${this.subscriberId}.wav`
            await this.downloadVoicemailGreetingFile({ id, type, fileName })
        },
        getWaitIdentifierUpload (type) {
            return 'subscriber-greeting-upload' + type
        },
        getWaitIdentifierDelete (type) {
            return 'subscriber-greeting-delete' + type
        },
        getWaitIdentifierLoad (type) {
            return 'subscriber-greeting-load' + type
        }
    }
}
</script>
