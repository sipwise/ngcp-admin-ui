import _ from 'lodash'
import {
    toFileId
} from 'src/api/common'
export function filterSoundSets (state, soundSets) {
    state.filteredSoundSets = soundSets
}
export function commitSoundhandles (state, payload) {
    state.soundHandles = payload
}
export function soundHandlesRequesting (state) {
    state.soundHandleListState = 'requesting'
}
export function soundHandlesSucceeded (state, soundHandles) {
    state.soundHandleListState = 'succeeded'
    const soundHandleList = _.get(soundHandles, 'items', [])
    soundHandleList.map((soundHandle) => {
        if (!state.soundHandleGroups.includes(soundHandle.group)) {
            state.soundHandleGroups.push(soundHandle.group)
        }
        return soundHandle
    })
    state.soundHandleGroups.sort()
    state.soundHandleGroups.map((group) => {
        state.soundHandleList[group] = soundHandleList.filter((soundHandle) => group === soundHandle.group)
        return group
    })
}
export function soundFilesRequesting (state, soundSetId) {
    delete state.soundFileListStates[soundSetId]
    state.soundFileListStates[soundSetId] = 'requesting'
}
export function soundFilesSucceeded (state, soundFilesList) {
    delete state.soundFileListStates[soundFilesList.soundSetId]
    state.soundFileListStates[soundFilesList.soundSetId] = 'succeeded'

    _.get(soundFilesList, 'soundFiles.items', []).forEach((soundFile) => {
        state.soundFileMap[toFileId({
            soundSetId: soundFile.set_id,
            soundHandle: soundFile.handle
        })] = soundFile
    })
}
export function soundSetUpdateSucceeded (state, soundSet) {
    state.soundSetUpdateState = 'succeeded'
    const index = state.soundSetList.findIndex((soundSetItem) => soundSetItem.id === soundSet.id)
    state.soundSetMap[soundSet.id] = soundSet
    state.soundSetList[index] = soundSet
    if (state?.soundSetSelected?.id === soundSet.id) {
        state.soundSetSelected = soundSet
    }
}
export function selectSoundSet (state, soundSetId) {
    state.soundSetSelected = state.soundSetMap[soundSetId]
}
export function resetSelectedSoundSet (state) {
    state.soundSetSelected = null
}
export function soundFileRequesting (state, options) {
    delete state.soundFileState[options.soundFile.id]
    state.soundFileState[options.soundFile.id] = 'requesting'
}
export function soundFileSucceeded (state, options) {
    const soundFileIntId = toFileId({
        soundSetId: options.soundFile.set_id,
        soundHandle: options.soundFile.handle
    })
    delete state.soundFileState[options.soundFile.id]
    state.soundFileState[options.soundFile.id] = 'succeeded'
    delete state.soundFileUrlMap[soundFileIntId]
    state.soundFileUrlMap[soundFileIntId] = options.soundFileUrl
}
export function soundFileFailed (state, options) {
    delete state.soundFileState[options.soundFile.id]
    state.soundFileState[options.soundFile.id] = 'failed'
}
export function soundFileUploadRequesting (state, soundFileId) {
    delete state.soundFileUploadState[soundFileId]
    state.soundFileUploadState[soundFileId] = 'requesting'
}
export function soundFileUploadSucceeded (state, options) {
    const soundFileId = toFileId({
        soundSetId: options.soundFile.set_id,
        soundHandle: options.soundFile.handle
    })
    delete state.soundFileUploadState[soundFileId]
    state.soundFileUploadState[soundFileId] = 'succeeded'
    delete state.soundFileMap[soundFileId]
    state.soundFileMap[soundFileId] = options.soundFile
    delete state.soundFileUrlMap[soundFileId]
    state.soundFileUrlMap[soundFileId] = options.soundFileUrl
    delete state.soundFileUploadProgress[soundFileId]
    state.soundFileUploadProgress[soundFileId] = 0
}
export function soundFileUploadAborted (state, options) {
    delete state.soundFileUploadState[options.soundFileId]
    state.soundFileUploadState[options.soundFileId] = 'failed'
}
export function soundFileUploadProgressed (state, options) {
    delete state.soundFileUploadProgress[options.soundFileId]
    state.soundFileUploadProgress[options.soundFileId] = options.progress
}
export function soundFileUpdateRequesting (state, options) {
    const soundFileIntId = toFileId({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle
    })

    delete state.soundFileUpdateState[soundFileIntId]
    state.soundFileUpdateState[soundFileIntId] = 'requesting'
}
export function soundFileUpdateSucceeded (state, soundFile) {
    const soundFileIntId = toFileId({
        soundSetId: soundFile.set_id,
        soundHandle: soundFile.handle
    })
    delete state.soundFileUpdateState[soundFileIntId]
    state.soundFileUpdateState[soundFileIntId] = 'succeeded'

    delete state.soundFileMap[soundFileIntId]
    state.soundFileMap[soundFileIntId] = soundFile
}
export function soundFileUpdateFailed (state, options) {
    const soundFileIntId = toFileId({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle
    })
    delete state.soundFileUpdateState[soundFileIntId]
    state.soundFileUpdateState[soundFileIntId] = 'failed'
}
export function soundFileRemoveRequesting (state, options) {
    const soundFileIntId = toFileId({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle
    })
    delete state.soundFileRemoveState[soundFileIntId]
    state.soundFileRemoveState[soundFileIntId] = 'requesting'
}
export function soundFileRemoveSucceeded (state, soundFile) {
    const soundFileIntId = toFileId({
        soundSetId: soundFile.soundSetId,
        soundHandle: soundFile.soundHandle
    })
    delete state.soundFileRemoveState[soundFileIntId]
    state.soundFileRemoveState[soundFileIntId] = 'succeeded'
    delete state.soundFileMap[soundFileIntId]
}
export function soundFileRemoveFailed (state, options) {
    const soundFileIntId = toFileId({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle
    })
    delete state.soundFileRemoveState[soundFileIntId]
    state.soundFileRemoveState[soundFileIntId] = 'failed'
}
