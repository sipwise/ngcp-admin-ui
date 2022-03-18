<template>
    <div>
        <div
            class="row no-padding"
        >
            <q-input
                class="col"
                readonly
                :value="inputValue"
                :label="label"
            >
                <template
                    v-slot:prepend
                >
                    <q-icon
                        :name="icon"
                    />
                </template>
                <template
                    v-slot:append
                >
                    <q-btn
                        v-if="!uploaded && selectedFile === null"
                        icon="folder"
                        color="primary"
                        flat
                        dense
                        :label="$t('Select')"
                        :disable="isPlaying || disable"
                        @click="$refs.fileUpload.click()"
                    />
                    <q-btn
                        v-if="uploaded"
                        icon="delete"
                        color="negative"
                        flat
                        dense
                        :label="deleteButtonLabel"
                        :disable="isPlaying || disable"
                        @click="confirmDelete"
                    />
                    <q-btn
                        v-if="selectedFile !== null && !uploaded"
                        icon="undo"
                        color="primary"
                        flat
                        dense
                        :label="$t('Reset')"
                        :disable="isPlaying || (!uploading && disable)"
                        @click="cancel"
                    />
                    <q-btn
                        v-if="selectedFile !== null && !uploading && !uploaded"
                        icon="cloud_upload"
                        color="primary"
                        flat
                        dense
                        :label="$t('Upload')"
                        :disable="isPlaying || disable"
                        @click="upload"
                    />
                </template>
            </q-input>
            <input
                v-show="!uploaded && selectedFile === null"
                ref="fileUpload"
                style="width: 1px; height: 1px; opacity: 0"
                :accept="fileTypes"
                type="file"
                @change="inputChange"
            >
        </div>
        <div
            class="row sound-file-progress-row"
        >
            <q-linear-progress
                v-show="loading"
                indeterminate
                size="2px"
                color="primary"
            />
        </div>
        <div
            class="row sound-file-progress-row"
        >
            <q-linear-progress
                v-show="uploading"
                size="2px"
                color="primary"
                :value="uploadingProgress / 100"
            />
        </div>
        <div
            v-show="uploaded"
            class="row no-padding"
        >
            <aui-audio-player
                ref="audioPlayer"
                class="col"
                :file-url="playerFileUrl"
                :loaded="loaded"
                :disable="disablePlayer"
                :hide-download-button="false"
                @load="playerLoadFile"
                @playing="audioPlayerPlaying"
                @stopped="audioPlayerStopped"
                @download="download"
            />
        </div>
    </div>
</template>

<script>
import AuiAudioPlayer from 'components/AuiAudioPlayer'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
export default {
    name: 'AuiSoundFileUpload',
    components: {
        AuiAudioPlayer
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        deleteLabel: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: ''
        },
        uploading: {
            type: Boolean,
            default: false
        },
        uploaded: {
            type: Boolean,
            default: false
        },
        uploadingProgress: {
            type: Number,
            default: 0
        },
        fileTypes: {
            type: String,
            default: ''
        },
        playerFileUrl: {
            type: String,
            default: null
        },
        loaded: {
            type: Boolean,
            default: false
        },
        disable: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        stopAll: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            selectedFile: null,
            isPlaying: false
        }
    },
    computed: {
        disablePlayer () {
            return (!!this.selectedFile) || !this.uploaded || this.disable
        },
        inputValue () {
            if (this.selectedFile === null) {
                return this.value
            } else {
                return this.selectedFile.name
            }
        },
        deleteButtonLabel () {
            return (typeof this.deleteLabel === 'string') ? this.deleteLabel.trim() : this.$t('Delete')
        }
    },
    watch: {
        stopAll (state) {
            if (state && this.$refs.audioPlayer) {
                this.$refs.audioPlayer.stop()
                this.audioPlayerStopped()
            }
        },
        uploaded (uploaded) {
            if (uploaded) {
                this.reset()
            }
        }
    },
    methods: {
        setPlayingTrue () {
            this.$refs.audioPlayer.setPlayingTrue()
            this.isPlaying = true
        },
        setPausedFalse () {
            this.$refs.audioPlayer.setPausedFalse()
        },
        audioPlayerPlaying () {
            this.isPlaying = true
        },
        audioPlayerStopped () {
            this.isPlaying = false
        },
        inputChange (event) {
            this.selectedFile = event.target.files[0]
        },
        cancel () {
            this.selectedFile = null
            this.$refs.fileUpload.value = null
            if (this.uploading) {
                this.abort()
            }
        },
        upload () {
            this.$emit('upload', this.selectedFile)
        },
        download () {
            this.$emit('download')
        },
        abort () {
            this.$emit('abort')
        },
        reset () {
            this.cancel()
        },
        playerLoadFile (format) {
            this.$emit('player-load-file', format)
        },
        delete () {
            this.$emit('delete')
        },
        confirmDelete () {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                parent: this,
                title: this.$t('Delete'),
                icon: 'delete',
                text: this.$t('You are about to delete this file'),
                buttonIcon: 'delete',
                buttonLabel: this.$t('Delete')
            }).onOk(() => {
                this.delete()
            })
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
    .sound-file-progress-row
        padding-top: 1px
        min-height: 4px
</style>
