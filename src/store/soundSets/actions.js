import {
    getSoundFile,
    removeSoundFiles,
    setLoopPlays,
    setUseParents,
    toFileId,
    uploadSoundFiles
} from 'src/api/common'
import {
    apiGet,
    apiGetList,
    apiPostMinimal,
    apiPutMinimal
} from 'src/api/ngcpAPI'

const soundFileUploadRequests = new Map()

export async function createSoundSets ({ commit }, data) {
    return apiPostMinimal({ resource: 'soundsets', data })
}
export async function updateSoundSets ({ commit }, data) {
    return await apiPutMinimal({
        resource: 'soundsets',
        resourceId: data.id,
        // language, loopplay, replace_existing are only considered when we send copy_from_default: true
        data: { ...data.payload, copy_from_default: true }
    })
}
export async function getAllSoundHandles () {
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
    context.commit('soundHandlesRequesting')
    getAllSoundHandles().then((soundHandles) => {
        context.commit('soundHandlesSucceeded', soundHandles)
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundHandlesSucceeded', {
            items: []
        })
    })

    context.commit('soundFilesRequesting', soundSetId)
    getAllSoundFilesBySoundSetId(soundSetId).then((soundFiles) => {
        context.commit('soundFilesSucceeded', {
            soundSetId,
            soundFiles
        })
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundFilesSucceeded', {
            soundSetId,
            soundFiles: {
                items: []
            }
        })
    })
}
export async function playSoundFile (context, soundFile) {
    context.commit('soundFileRequesting', {
        soundFile
    })
    getSoundFile({
        id: soundFile.id
    }).then((soundFileUrl) => {
        context.commit('soundFileSucceeded', {
            soundFile,
            soundFileUrl
        })
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundFileFailed', {
            soundFile
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
                progress
            })
        }
    }).then((res) => {
        context.commit('soundFileUploadSucceeded', res)
    }).catch((err) => {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundFileUpdateFailed', options)
    })
}
export async function setUseParent (context, options) {
    context.commit('soundFileUpdateRequesting', options)
    setUseParents(options).then((soundFile) => {
        context.commit('soundFileUpdateSucceeded', soundFile)
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundFileUpdateFailed', options)
    })
}
export async function removeSoundFile (context, options) {
    context.commit('soundFileRemoveRequesting', options)
    removeSoundFiles(options.soundFileId).then(() => {
        context.commit('soundFileRemoveSucceeded', options)
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.debug(err)
        context.commit('soundFileRemoveFailed', options)
    })
}
