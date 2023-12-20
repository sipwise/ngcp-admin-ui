import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal,
    apiGetList,
    apiPutMinimal,
    apiGet
} from 'src/api/ngcpAPI'
const columns = [
    'id',
    'reseller_name',
    'contract_contact_email',
    'name',
    'description',
    'null'
]
import {
    getSoundFile, toFileId, uploadSoundFiles, setLoopPlays, setUseParents, removeSoundFiles
} from 'src/api/common'

const soundFileUploadRequests = new Map()

export async function fetchSoundSets ({ commit }, options) {
    return ajaxFetchTable('/sound/ajax', columns, options)
}

export async function filterSoundSets ({ commit, dispatch }, filter) {
    const soundSets = await dispatch('fetchSoundSets', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    })
    commit('filterSoundSets', _.get(soundSets, 'aaData', []))
}
export async function createSoundSets ({ commit }, data) {
    return apiPostMinimal({ resource: 'soundsets', data })
}
export async function updateSoundSets ({ commit }, data) {
    data.payload.copy_from_default = true
    return await apiPutMinimal({
        resource: 'soundsets',
        resourceId: data.id,
        data: data.payload
    })
}
export async function getAllSoundHandles (options) {
    const res = await apiGetList({
        resource: 'soundhandles',
        params: {
            page: 1,
            rows: 151
        }

    })
    return res
}
export async function getAllSoundFilesBySoundSetId (soundSetId) {
    const res = await apiGetList({
        resource: 'soundfiles',
        params: {
            set_id: soundSetId,
            page: 1,
            rows: 151
        }

    })
    return res
}
export async function getAllSoundFiles ({ commit }, options) {
    return await apiGet({
        resource: 'soundfiles',
        config: {
            params: { set_id: options.set_id }
        }
    })
}
export async function loadSoundSetResources (context, soundSetId) {
    if (context.state.soundHandleListState !== 'succeeded') {
        context.commit('soundHandlesRequesting')
        getAllSoundHandles().then((soundHandles) => {
            context.commit('soundHandlesSucceeded', soundHandles)
        }).catch((err) => {
            console.debug(err)
            context.commit('soundHandlesSucceeded', {
                items: []
            })
        })
    }
    if (context.state.soundFileListStates[soundSetId] !== 'succeeded') {
        context.commit('soundFilesRequesting', soundSetId)
        getAllSoundFilesBySoundSetId(soundSetId).then((soundFiles) => {
            context.commit('soundFilesSucceeded', {
                soundSetId: soundSetId,
                soundFiles: soundFiles
            })
        }).catch((err) => {
            console.debug(err)
            context.commit('soundFilesSucceeded', {
                soundSetId: soundSetId,
                soundFiles: {
                    items: []
                }
            })
        })
    }
}
export async function playSoundFile (context, soundFile) {
    context.commit('soundFileRequesting', {
        soundFile: soundFile
    })
    getSoundFile({
        id: soundFile.id
    }).then((soundFileUrl) => {
        context.commit('soundFileSucceeded', {
            soundFile: soundFile,
            soundFileUrl: soundFileUrl
        })
    }).catch((err) => {
        console.debug(err)
        context.commit('soundFileFailed', {
            soundFile: soundFile
        })
    })
}
export async function uploadSoundFile (context, options) {
    context.commit('soundFileUploadRequesting', toFileId({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle
    }))
    uploadSoundFiles({
        soundSetId: options.soundSetId,
        soundHandle: options.soundHandle,
        soundFileData: options.soundFileData,
        initialized: (request) => {
            soundFileUploadRequests.set(toFileId({
                soundSetId: options.soundSetId,
                soundHandle: options.soundHandle
            }), request)
        },
        progressed: (progress) => {
            context.commit('soundFileUploadProgressed', {
                soundFileId: toFileId({
                    soundSetId: options.soundSetId,
                    soundHandle: options.soundHandle
                }),
                progress: progress
            })
        }
    }).then((res) => {
        context.commit('soundFileUploadSucceeded', res)
    }).catch((err) => {
        console.debug(err)
        context.commit('soundFileUploadAborted', {
            soundFileId: toFileId({
                soundSetId: options.soundSetId,
                soundHandle: options.soundHandle
            })
        })
    })
}
export async function setLoopPlay (context, options) {
    context.commit('soundFileUpdateRequesting', options)
    setLoopPlays(options).then((soundFile) => {
        context.commit('soundFileUpdateSucceeded', soundFile)
    }).catch((err) => {
        console.debug(err)
        context.commit('soundFileUpdateFailed', options)
    })
}
export async function setUseParent (context, options) {
    context.commit('soundFileUpdateRequesting', options)
    setUseParents(options).then((soundFile) => {
        context.commit('soundFileUpdateSucceeded', soundFile)
    }).catch((err) => {
        console.debug(err)
        context.commit('soundFileUpdateFailed', options)
    })
}
export async function removeSoundFile (context, options) {
    context.commit('soundFileRemoveRequesting', options)
    removeSoundFiles(options.soundFileId).then(() => {
        context.commit('soundFileRemoveSucceeded', options)
    }).catch((err) => {
        console.debug(err)
        context.commit('soundFileRemoveFailed', options)
    })
}
