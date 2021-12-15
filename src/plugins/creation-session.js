
function isCreationPath (path) {
    return path.split('/').find(pathPart => pathPart.endsWith('create'))
}

function isEditPath (path) {
    return path.split('/').find(pathPart => pathPart.endsWith('edit'))
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
            if (prevPath) {
                await router.push({ path: prevPath })
            } else if (!store.state.creationSession.isOriginEditPage) {
                const routeData = router.resolve({ path: prevPath })
                const rootRouteName = routeData.route.meta.parentPath.split('.')[0]
                await router.push({ name: rootRouteName })
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
                    isOriginEditPage: isEditPath(from.path)
                })
            } else if (isFromCreationForm && !isToCreationForm) {
                store.commit('creationSession/leaveSession')
            } else if (isBothCreationForm) {
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
