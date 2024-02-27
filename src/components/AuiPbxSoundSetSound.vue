<template>
    <div
        :class="itemClasses"
    >
        <div
            class="aui-pbx-sound-set-sound-label col-2"
        >
            <q-icon
                class="aui-pbx-sound-set-sound-icon"
                name="music_note"
                size="24px"
            />{{ soundHandle.handle }}
        </div>
        <div
            class="col-grow"
        >
            <div
                class="row items-center"
            >
                <div
                    class="box col-9"
                >
                    <q-checkbox
                        v-if="hasParent"
                        :model-value="soundFileUseparent"
                        :disable="isUploading || isUpdating || isSoundFileRemoving"
                        :label="$t('Use Parent')"
                        left-label
                        @update:model-value="toggleUseParent"
                    />
                    <q-checkbox
                        v-if="soundFile && !selectedFile && soundFile.filename"
                        :model-value="soundFileLoopplay"
                        :label="$t('Loop')"
                        :disable="isUpdating || isSoundFileRemoving"
                        left-label
                        @update:model-value="toggleLoopPlay"
                    />
                    <aui-player-audio
                        v-if="soundFile && soundFile.filename && !selectedFile"
                        :file-url="soundFileUrl"
                        style="width: 30%;"
                        @load="loadPlay"
                    />
                    <div
                        class="input"
                    >
                        <input
                            ref="fileUpload"
                            style="width: 1px; height: 1px; opacity: 0"
                            accept=".wav,.mp3,.ogg"
                            type="file"
                            @input="selectFile"
                        >
                        <q-icon
                            v-if="(soundFile && soundFile.filename) || selectedFile"
                            name="insert_drive_file"
                            class="aui-pbx-sound-set-sound-icon"
                            size="24px"
                        />
                        <span
                            v-if="!selectedFile && soundFile"
                        >
                            {{ soundFileFilename }}
                        </span>
                        <span
                            v-else-if="selectedFile"
                        >
                            {{ selectedFile.name }}
                        </span>
                        <span
                            v-else
                        >
                            {{ $t('No file attached') }}
                        </span>
                    </div>
                </div>
                <div
                    class="col-grow text-right"
                >
                    <q-btn
                        v-if="!selectedFile"
                        flat
                        color="primary"
                        icon="folder"
                        :disable="isUpdating || isUploading || isSoundFileRemoving"
                        @click="openFileSelectionDialog"
                    >
                        {{ $t('Select file') }}
                    </q-btn>
                    <q-btn
                        v-if="soundFile && !selectedFile && soundFile.filename"
                        flat
                        color="negative"
                        icon="delete"
                        :disable="isUpdating || isSoundFileRemoving"
                        @click="removeUploadedFile"
                    >
                        {{ $t('Remove') }}
                    </q-btn>
                    <q-btn
                        v-if="selectedFile && !isUploading"
                        flat
                        color="primary"
                        icon="cloud_upload"
                        @click="uploadFile"
                    >
                        {{ $t('Upload') }}
                    </q-btn>
                    <q-btn
                        v-if="selectedFile && !isUploading"
                        flat
                        color="black"
                        icon="undo"
                        @click="resetFile"
                    >
                        {{ $t('Reset') }}
                    </q-btn>
                </div>
            </div>
            <div
                v-if="isUploading"
                class="row items-center"
            >
                <div
                    class="aui-progress-col col-grow"
                >
                    <q-linear-progress
                        :buffer="soundFileUploadProgress * 0.01"
                        color="primary"
                        stripe
                        height="24px"
                    />
                </div>
            </div>
        </div>
        <aui-object-spinner
            v-if="isUpdating"
            :loading="isUpdating"
        />
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import AuiPlayerAudio from './AuiPlayerAudio'
import AuiObjectSpinner from './AuiObjectSpinner'

export default {
    name: 'AuiPbxSoundSetSound',
    components: {
        AuiObjectSpinner,
        AuiPlayerAudio
    },
    props: {
        odd: {
            type: Boolean,
            default: false
        },
        soundHandle: {
            type: Object,
            default: null
        },
        soundFile: {
            type: Object,
            default: null
        },
        soundFileUrl: {
            type: String,
            default: null
        },
        soundFileUploadState: {
            type: String,
            default: null
        },
        soundFileUploadProgress: {
            type: Number,
            default: 0
        },
        soundFileUpdateState: {
            type: String,
            default: null
        },
        hasParent: {
            type: Number,
            default: null
        }
    },
    emits: ['play', 'upload', 'toggle-loop-play', 'toggle-use-parent', 'remove-uploaded-file'],
    data () {
        return {
            selectedFile: null,
            selectedFileUploading: false
        }
    },
    computed: {
        ...mapGetters('soundSets', [
            'isSoundFileRemoving'
        ]),
        soundFileLoopplay () {
            if (this.soundFile && this.soundFile.loopplay) {
                return this.soundFile.loopplay
            }
            return false
        },
        soundFileFilename () {
            if (this.soundFile && this.soundFile.filename) {
                return this.soundFile.filename
            } else if (this.soundFile && !this.soundFile.filename) {
                return this.$t('No file attached')
            }
            return ''
        },
        soundFileId () {
            if (this.soundFile && this.soundFile.id) {
                return this.soundFile.id
            }
            return null
        },
        soundFileUseparent () {
            if (this.soundFile) {
                return this.soundFile.use_parent
            }
            return true
        },
        itemClasses () {
            const classes = ['aui-pbx-sound-set-sound', 'row', 'items-center']
            if (this.odd) {
                classes.push('aui-pbx-sound-set-sound-odd')
            }
            return classes
        },
        isUploading () {
            return this.soundFileUploadState === 'requesting'
        },
        isUpdating () {
            return this.soundFileUpdateState === 'requesting'
        }
    },
    watch: {
        soundFileUploadState (state) {
            if (state === 'succeeded' || state === 'failed') {
                this.selectedFile = this.resetFile()
            }
        }
    },
    mounted () {
    },
    methods: {
        openFileSelectionDialog () {
            if (this.$refs.fileUpload) {
                this.$refs.fileUpload.click()
            }
        },
        selectFile (event) {
            this.selectedFile = event.target.files[0]
        },
        resetFile () {
            this.selectedFile = null
            if (this.$refs.fileUpload) {
                this.$refs.fileUpload.value = ''
            }
        },
        loadPlay () {
            this.$emit('play', this.soundFile)
        },
        uploadFile () {
            this.$emit('upload', {
                soundHandle: this.soundHandle.handle,
                soundFileData: this.selectedFile
            })
        },
        toggleLoopPlay () {
            this.$emit('toggle-loop-play', {
                soundSetId: this.soundFile.set_id,
                soundHandle: this.soundFile.handle,
                soundFileId: this.soundFile.id,
                loopPlay: !this.soundFileLoopplay
            })
        },
        toggleUseParent () {
            if (!this.soundFile) {
                this.$emit('upload', {
                    soundHandle: this.soundHandle.handle,
                    soundFileData: null,
                    useParent: false
                })
            } else {
                this.$emit('toggle-use-parent', {
                    soundSetId: this.soundFile.set_id,
                    soundHandle: this.soundFile.handle,
                    soundFileId: this.soundFile.id,
                    useParent: !this.soundFileUseparent
                })
            }
        },
        removeUploadedFile () {
            this.$emit('remove-uploaded-file', {
                soundFileId: this.soundFile.id,
                soundSetId: this.soundFile.set_id,
                soundHandle: this.soundFile.handle
            })
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.input
    margin-top: 8px
    margin-left: 6px
.box
    display: flex
.aui-progress-col
    margin-top: $flex-gutter-xs
    .q-progress
        height: 24px
.aui-pbx-sound-set-sound.aui-pbx-sound-set-sound-odd
    background-color: $item-stripe-color
.aui-pbx-sound-set-sound
    position: relative
    padding: $flex-gutter-xs
    .aui-col-right
        padding-left: $flex-gutter-sm
    .aui-pbx-sound-set-sound-icon
        margin-right: $flex-gutter-xs
    .aui-pbx-sound-set-sound-player
        padding-left: $flex-gutter-md
        .q-input
            margin: 0
    .aui-pbx-sound-set-sound-label
        color: rgba(black, 80%)
    .audio-player
        .progress-bar
            margin-right: 0
</style>
