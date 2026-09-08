import { LAYOUT_DEFAULT } from 'src/constants'

export default function () {
    return {
        view: LAYOUT_DEFAULT,
        headerVisible: true,
        footerVisible: true,
        drawerLeftVisible: false,
        drawerLeftVisibleBeforeFullscreen: false,
        fullscreen: false
    }
}
