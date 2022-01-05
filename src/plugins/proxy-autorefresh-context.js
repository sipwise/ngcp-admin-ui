
function isEditPath (path) {
    return path.split('/').some(pathPart => pathPart.endsWith('edit'))
}

export default {
    install (Vue, { store, router }) {
        router.afterEach((to, from) => {
            const isFromEditProxyForm = isEditPath(from.path) && from?.meta?.proxy
            const fromContexts = (from?.meta?.parentPath || '').split('.').filter(name => String(name).endsWith('Context'))
            const toContexts = (to?.meta?.parentPath || '').split('.').filter(name => String(name).endsWith('Context'))
            const isSameContext = fromContexts.some(name => toContexts.includes(name))
            const reloadContext = isFromEditProxyForm && isSameContext
            if (reloadContext) {
                store.dispatch('page/reloadContext')
            }
        })
    }
}
