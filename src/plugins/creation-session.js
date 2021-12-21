
function isCreationPath (path) {
    return path.split('/').some(pathPart => pathPart.endsWith('create'))
}

export default {
    install (Vue, { store, router }) {
        async function goToNextForm ({ fromPath, toPath, formData }) {
            store.commit('creationSession/goToNextForm', { fromPath, toPath, formData })
            await router.push({ path: toPath })
        }
        async function goToPrevForm () {
            store.commit('creationSession/goToPrevForm')
            const prevPath = store.state.creationSession.currentFromPath
            const originPath = store.state.creationSession.originPath
            if (prevPath) {
                await router.push({ path: prevPath })
            } else if (originPath && originPath !== '/') {
                await router.push({ path: originPath })
            } else {
                router.back()
            }
        }
        router.afterEach((to, from) => {
            const isToCreationForm = isCreationPath(to.path)
            const isFromCreationForm = isCreationPath(from.path)
            const isBothCreationForm = isToCreationForm && isFromCreationForm
            if (!isFromCreationForm && isToCreationForm) {
                store.commit('creationSession/enterSession', {
                    currentPath: to.path,
                    originPath: from.path
                })
            } else if (isFromCreationForm && !isToCreationForm) {
                store.commit('creationSession/leaveSession')
            } else if (isBothCreationForm) {
                const previousForm = store.getters['creationSession/previousForm']
                const isForward = to.path !== previousForm?.fromPath && from.path !== previousForm?.fromPath
                if (from.meta.proxy && isForward) {
                    store.commit('creationSession/goToNextForm', {
                        fromPath: from.path,
                        toPath: to.path,
                        formData: {}
                    })
                }
                store.commit('creationSession/formToForm', {
                    fromPath: from.path,
                    toPath: to.path
                })
            }
        })
        Vue.prototype.$auiGoToNextForm = goToNextForm
        Vue.prototype.$auiGoToPrevForm = goToPrevForm
    }
}
