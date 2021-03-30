
export function toggleFullscreen (state) {
    state.fullscreen = !state.fullscreen
    state.headerVisible = !state.fullscreen
    state.footerVisible = !state.fullscreen
    state.drawerLeftVisible = !state.fullscreen
}

export function enableFullscreen (state) {
    state.fullscreen = true
    state.headerVisible = !state.fullscreen
    state.footerVisible = !state.fullscreen
    state.drawerLeftVisible = !state.fullscreen
}

export function disableFullscreen (state) {
    state.fullscreen = false
    state.headerVisible = !state.fullscreen
    state.footerVisible = !state.fullscreen
    state.drawerLeftVisible = !state.fullscreen
}

export function toggleDrawerLeft (state) {
    if (!state.fullscreen) {
        state.drawerLeftVisible = !state.drawerLeftVisible
    }
}
