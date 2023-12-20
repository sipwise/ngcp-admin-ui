import _ from 'lodash'
export function filteredSoundSetOptions (state) {
    const soundSets = []
    state.filteredSoundSets.forEach((soundSet) => {
        soundSets.push({
            label: soundSet.name,
            value: soundSet.name
        })
    })
    return soundSets
}
/*
export function filteredSoundSetGroup (state) {
    const groups = []
    const soundHandles = state.soundHandles
    soundHandles.map((soundHandle) => {
        if (!groups.includes(soundHandle.group)) {
            groups.push(soundHandle.group)
        }
        return soundHandle
    })
    groups.map((group) => {
        state.soundHandles[group] = soundHandles.filter((soundHandle) => group === soundHandle.group)
        return group
    })
    return groups
}
*/
export function soundHandlesSucceeded (state, soundHandles) {
    state.soundHandleListState = 'succeeded'
    const soundHandleList = _.get(soundHandles, 'items', [])
    soundHandleList.map((soundHandle) => {
        if (!state.soundHandleGroups.includes(soundHandle.group)) {
            state.soundHandleGroups.push(soundHandle.group)
        }
        return soundHandle
    })
    state.soundHandleGroups.map((group) => {
        state.soundHandleList[group] = soundHandleList.filter((soundHandle) => group === soundHandle.group)
        return group
    })
}
export function isSoundFileRemoving (state) {
    return state.soundFileRemoveState === 'requesting'
}
export function languageSoundSets () {
    return ['ro', 'en', 'de', 'ar', 'nl', 'it', 'pt_br', 'he', 'es', 'fr']
}
