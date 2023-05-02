<template>
    <q-list>
        <q-item
            class="no-padding aui-audio-player-row"
        >
            <audio
                ref="audio"
                :src="fileUrl"
                preload="auto"
                @timeupdate="timeUpdate"
            />
            <q-item-section
                class="no-padding"
                side
            >
                <q-btn
                    v-if="!playing"
                    flat
                    dense
                    color="primary"
                    icon="play_arrow"
                    data-cy="player-play-button"
                    :disable="disable"
                    @click="playLoad()"
                />
                <q-btn
                    v-if="playing"
                    flat
                    dense
                    color="primary"
                    icon="pause"
                    data-cy="player-pause-button"
                    :disable="disable"
                    @click="toggle()"
                />
            </q-item-section>
            <q-item-section
                class="no-padding q-mr-sm"
                side
            >
                <q-btn
                    :disable="disable"
                    flat
                    dense
                    color="primary"
                    icon="stop"
                    data-cy="player-stop-button"
                    @click="stop()"
                />
            </q-item-section>
            <q-item-section
                class="no-padding"
            >
                <q-linear-progress
                    :value="progressPercentage"
                    instant-feedback
                    color="primary"
                />
            </q-item-section>
            <q-item-section
                v-if="!hideDownloadButton"
                class="no-padding q-ml-sm"
                side
            >
                <q-btn
                    :disable="disable"
                    flat
                    dense
                    color="primary"
                    icon="download"
                    data-cy="player-download-button"
                    @click="download()"
                />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
export default {
    name: 'AuiAudioPlayer',
    props: {
        fileUrl: {
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
        pausable: {
            type: Boolean,
            default: false
        },
        hideDownloadButton: {
            type: Boolean,
            default: true
        }
    },
    emits: ['playing', 'loading', 'stopped', 'load', 'download'],
    data () {
        return {
            playing: false,
            paused: false,
            progressPercentage: 0
        }
    },
    computed: {
        playPauseIcon () {
            return this.playing ? 'pause' : 'play_arrow'
        },
        isLoaded () {
            return this.loaded || this.fileUrl
        }
    },
    watch: {
        fileUrl () {
            if (this.fileUrl) {
                this.play()
            }
        }
    },
    mounted () {
        this.$refs.audio.addEventListener('play', () => {
            this.playing = true
        })
        this.$refs.audio.addEventListener('playing', () => {
            this.playing = true
        })
        this.$refs.audio.addEventListener('ended', () => {
            this.playing = false
            this.stop()
        })
        this.$refs.audio.addEventListener('canplay', () => {
            if (!this.paused && this.playing) {
                this.$refs.audio.play()
            }
        })
    },
    methods: {
        play () {
            const playPromise = this.$refs.audio.play()
            if (playPromise && playPromise.then) {
                playPromise.then(() => {
                    this.playing = true
                    this.paused = false
                    this.$emit('playing')
                }).catch(() => {
                    this.playing = true
                    this.paused = false
                    this.$emit('loading')
                })
            } else {
                this.playing = true
                this.paused = false
                this.$emit('playing')
            }
        },
        pause () {
            this.$refs.audio.pause()
            this.playing = false
            this.paused = true
        },
        stop () {
            this.$refs.audio.currentTime = 0
            this.pause()
            this.$emit('stopped')
        },
        setPlayingTrue () {
            this.playing = true
        },
        setPausedFalse () {
            this.paused = false
        },
        timeUpdate () {
            this.progressPercentage = this.$refs.audio.currentTime / this.$refs.audio.duration
        },
        load () {
            const formats = {
                mp3: 'audio/mpeg',
                mp4: 'audio/mp4',
                ogg: 'audio/ogg',
                aac: 'audio/aac',
                wav: 'audio/x-wav'
            }
            const supportedFormats = Object.entries(formats).reduce((acc, [code, type]) => this.$refs.audio.canPlayType(type) ? [...acc, code] : acc, [])
            this.$emit('load', supportedFormats)
        },
        toggle () {
            if (this.$refs.audio.paused) {
                this.playLoad()
            } else {
                this.pause()
            }
        },
        playLoad () {
            if (!this.isLoaded) {
                this.load()
            } else if (this.$refs.audio.paused) {
                this.play()
            }
        },
        download () {
            this.$emit('download')
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-audio-player-row
    min-height: 32px
</style>
