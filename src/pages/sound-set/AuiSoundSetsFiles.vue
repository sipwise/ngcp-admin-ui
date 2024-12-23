<template>
    <q-item
        class="col col-xs-12"
    >
        <q-list
            class="col col-xs-12"
            side
            top
            no-wrap
        >
            <div
                class="aui-pbx-sound-set-sound-list"
            >
                <aui-list-item
                    v-for="(group, index) in soundHandleGroups"
                    :key="group"
                    ref="soundFiles"
                    :odd="(index % 2) === 0"
                    icon="music_note"
                    :expanded="expanded[group]"
                    :show-more-menu="false"
                    @toggle="toggle(group)"
                >
                    <template
                        #title
                    >
                        <aui-list-item-title>
                            {{ group }}
                        </aui-list-item-title>
                    </template>
                    <template
                        #body
                    >
                        <aui-pbx-sound-set-sound
                            v-for="(soundHandle, indexSoundHandle) in soundHandleList[group]"
                            :key="soundHandle.id"
                            :odd="(indexSoundHandle % 2) === 0"
                            :sound-handle="soundHandle"
                            :sound-file="soundFileMap[$route.params.id + '-' + soundHandle.handle]"
                            :sound-file-url="soundFileUrlMap[$route.params.id + '-' + soundHandle.handle]"
                            :sound-file-upload-state="soundFileUploadState[$route.params.id + '-' + soundHandle.handle]"
                            :sound-file-upload-progress="soundFileUploadProgress[$route.params.id + '-' + soundHandle.handle]"
                            :sound-file-update-state="soundFileUpdateState[$route.params.id + '-' + soundHandle.handle]"
                            :has-parent="soundSetsContextParentId"
                            :read-only="!soundSetsContextCustomer"
                            @play="playSoundFile"
                            @upload="uploadFile"
                            @toggle-loop-play="setLoopPlay"
                            @toggle-use-parent="setUseParent"
                            @remove-uploaded-file="removeUploadedFile"
                        />
                    </template>
                    <template
                        #actions
                    >
                        <q-btn
                            size="md"
                            color="primary"
                            round
                            flat
                            :icon="expanded[group] ? 'expand_less' : 'expand_more'"
                            @click.stop="toggle(group)"
                        />
                    </template>
                </aui-list-item>
            </div>
        </q-list>
    </q-item>
</template>
<script>
import useValidate from '@vuelidate/core'
import AuiListItem from 'components/AuiListItem'
import AuiListItemTitle from 'components/AuiListItemTitle'
import AuiPbxSoundSetSound from 'components/AuiPbxSoundSetSound'
import _ from 'lodash'
import {
    showGlobalError,
    showToast
} from 'src/helpers/ui'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'AuiSoundSetsFiles',
    components: {
        AuiListItem,
        AuiListItemTitle,
        AuiPbxSoundSetSound
    },
    mixins: [
        soundSetsContextMixin
    ],
    data () {
        return {
            changes: null,
            expanded: {},
            v$: useValidate()
        }
    },
    computed: {
        ...mapState('soundSets', [
            'soundHandleList',
            'soundFileMap',
            'soundFileUrlMap',
            'soundFileUploadState',
            'soundFileUploadProgress',
            'soundFileUpdateState',
            'soundHandleGroups',
            'soundSetUpdateState'

        ])
    },
    watch: {
        soundSetUpdateState (state) {
            if (state === 'succeeded') {
                showToast(this.getSoundSetUpdateToastMessage)
            } else if (state === 'failed') {
                showGlobalError(this.soundSetUpdateError)
            }
        },
        soundSetSelected () {
            this.changes = this.getSoundSetData()
        },
        soundHandleGroups (state) {
            if (state.length > 0) {
                state.map((group) => {
                    _.set(this.expanded, group, false)
                    return group
                })
            }
        }
    },
    async mounted () {
        this.selectSoundSet(this.$route.params.id)
        await this.loadSoundSetResources(this.$route.params.id)
        if (this.soundHandleGroups.length > 0) {
            this.soundHandleGroups.map((group) => {
                _.set(this.expanded, group, false)
                return group
            })
        }
    },
    methods: {
        ...mapMutations('soundSets', [
            'selectSoundSet'
        ]),
        ...mapActions('soundSets', [
            'loadSoundSetResources',
            'setLoopPlay',
            'setUseParent',
            'playSoundFile',
            'uploadSoundFile',
            'removeSoundFile'
        ]),
        uploadFile (options) {
            this.uploadSoundFile({
                soundSetId: this.$route.params.id,
                soundHandle: options.soundHandle,
                soundFileData: options.soundFileData
            })
        },
        removeUploadedFile (options) {
            this.removeSoundFile(options)
        },
        toggle (group) {
            _.set(this.expanded, group, !this.expanded[group])
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">
.aui-pbx-sound-set-sound-list
    margin-top: $flex-gutter-sm
</style>
