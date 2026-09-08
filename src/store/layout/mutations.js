export function toggleFullscreen (state) {
    if (state.fullscreen) {
        disableFullscreen(state)
    } else {
        enableFullscreen(state)
    }
}

export function enableFullscreen (state) {
    state.fullscreen = true
    state.headerVisible = false
    state.footerVisible = false
    state.drawerLeftVisibleBeforeFullscreen = state.drawerLeftVisible
    state.drawerLeftVisible = false
}

export function disableFullscreen (state) {
    state.fullscreen = false
    state.headerVisible = true
    state.footerVisible = true
    state.drawerLeftVisible = state.drawerLeftVisibleBeforeFullscreen
}

export function toggleDrawerLeft (state) {
    if (!state.fullscreen) {
        state.drawerLeftVisible = !state.drawerLeftVisible
    }
}

export function setDrawerLeftVisible (state, visible) {
    state.drawerLeftVisible = !state.fullscreen && visible
}
