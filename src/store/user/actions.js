import { i18n } from 'boot/i18n'
import _ from 'lodash'
import { apiFetchEntity, httpApi } from 'src/api/ngcpAPI'
import { ajaxGet, ajaxPost } from 'src/api/ngcpPanelAPI'
import { getCapabilitiesWithoutError, getPlatformInfo } from 'src/api/user'
import {
    deleteJwt,
    getAdminId,
    getJwt,
    hasJwt,
    setJwt
} from 'src/auth'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { getCurrentLangAsV1Format } from 'src/i18n'
import {
    delSessionStorage, getLocal, getSessionStorage, setLocal
} from 'src/local-storage'
import router from 'src/router'
import { PATH_ENTRANCE, PATH_LOGIN } from 'src/router/common'

export async function login ({ commit, getters, state, dispatch }, options) {
    commit('loginRequesting')

    try {
        const res = await ajaxPost('/login_jwt', options)
        return handleLoginSuccess(res, { commit, getters, state, dispatch, router, aclSet: this.$aclSet })
    } catch (err) {
        return handleLoginError(err, { commit, state, dispatch, options, router })
    }
}

async function handleLoginSuccess (res, { commit, getters, state, dispatch, router, aclSet }) {
    if (!res?.data?.jwt) {
        commit('loginFailed', i18n.global.t('Internal error'))
        return
    }

    setJwt(res.data.jwt)
    const lastRole = getLocal('last_role')
    await dispatch('loadUser')

    // Handle user roles
    const hasRole = _.isString(state.user?.role)
    const hasDifferentRole = _.isString(lastRole) && hasRole && lastRole !== state.user?.role
    if (hasRole) {
        setLocal('last_role', state.user.role)
    }

    if (!hasJwt()) {
        commit('loginFailed', i18n.global.t('Internal error'))
        return
    }

    // Set permissions and navigate to appropriate page
    return navigateAfterLogin({ commit, getters, hasDifferentRole, router, aclSet })
}

async function handleLoginError (err, { commit, state, dispatch, options, router }) {
    const status = err?.response?.status
    const errorMessage = err?.response?.data?.message

    if ([403].includes(status) && ['Banned'].includes(errorMessage)) {
        commit('loginFailed', i18n.global.t('There is a problem with your account, please contact support'))
        throw err
    } else if ([403, 422].includes(status)) {
        commit('loginFailed', i18n.global.t('Wrong credentials'))
    } else {
        commit('loginFailed', i18n.global.t('Unexpected error'))
        throw err
    }
}

export async function loadUser ({ commit, dispatch }) {
    try {
        if (hasJwt()) {
            const userData = await Promise.all([
                apiFetchEntity('admins', getAdminId()),
                getCapabilitiesWithoutError(), // TODO: switch to "getCapabilities" function when "capabilities" endpoint will be fixed for "ccare\ccareadmin" users. It should not return 403 error.
                getPlatformInfo()
            ])
            if (userData[0] !== null) {
                commit('loginSucceeded', {
                    user: userData[0],
                    jwt: getJwt(),
                    capabilities: userData[1],
                    platformInfo: userData[2]
                })
                commit('settingsSucceeded', {
                    favPages: getLocal('favPages') || {}
                })
            } else {
                await dispatch('logout')
            }
        } else {
            await dispatch('logout')
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading user')
        // eslint-disable-next-line no-console
        console.error(err)
        showGlobalErrorMessage(err)
        await dispatch('logout')
    }
}

export async function logout ({ commit, state }) {
    if (state?.loginState !== 'loggingOut' || hasJwt()) {
        commit('logoutRequesting')
        deleteJwt()
        if (this.$aclReset) {
            this.$aclReset()
        }
        try {
            await ajaxGet('/ajax_logout')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Could not logout from v1 properly')
            // eslint-disable-next-line no-console
            console.error(err)
        } finally {
            commit('logoutSucceeded')
            router.push({ path: PATH_LOGIN }).catch((error) => {
                if (error?.name !== 'NavigationDuplicated') {
                    throw error
                }
            })
        }
    }
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
    setLocal('ngcpGoToOldAdminPanelInfo', false)
    commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
    commit('changeGoToOldAdminPanel', getLocal('ngcpGoToOldAdminPanelInfo'))
}

export async function goToOldAdminPanel ({ state }) {
    const baseUrl = (_.isString(this.$appConfig.ngcpPanelUrl) && _.trim(this.$appConfig.ngcpPanelUrl) !== '')
        ? this.$appConfig.ngcpPanelUrl
        : location.origin
    const goToUrl = new URL(state.currentGoToPath, baseUrl)
    goToUrl.searchParams.set('framed', '0')
    goToUrl.searchParams.set('lang', getCurrentLangAsV1Format())
    document.location.href = goToUrl.toString()
}

export async function loadEntity ({ commit }, options) {
    commit('entityLoadRequesting')
    const res = await httpApi.get(`/${options.entity}/${options.id}`)
    if (res.status >= 200 && res.status <= 299) {
        commit('entityLoadSucceeded', res.data)
    } else {
        commit('entityLoadFailed', res.data.message)
    }
}

export async function pinMenu (context) {
    setLocal('menuPinned', !context.state.menuPinned)
    context.commit('pinMenu', getLocal('menuPinned'))
}

export async function loadMenuState (context) {
    context.commit('pinMenu', getLocal('menuPinned'))
}

export async function passwordReset ({ commit }, data) {
    commit('newPasswordRequesting', true)
    const response = await httpApi.post('/passwordreset/', data)
    commit('newPasswordRequesting', false)
    return response
}

export async function updateFavPages ({ commit }) {
    const favPages = getLocal('favPages') || {}
    Object.keys(favPages).forEach((favPagePath) => {
        const meta = this.$routeMeta.$routePathMeta({ path: favPagePath })
        favPages[favPagePath].icon = meta.icon
        favPages[favPagePath].label = meta.label
    })
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}

export async function toggleFavPage ({ context, commit }, { route }) {
    const routePathMeta = this.$routeMeta.$routePathMeta(route)
    const page = {
        icon: routePathMeta.icon,
        label: routePathMeta.label
    }
    const favPages = getLocal('favPages') || {}
    if (favPages[route.path]) {
        delete favPages[route.path]
    } else {
        favPages[route.path] = page
    }
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}

export async function deleteFavPage ({ context, commit }, { path }) {
    const favPages = getLocal('favPages') || {}
    delete favPages[path]
    setLocal('favPages', favPages)
    commit('settingsSucceeded', {
        favPages
    })
}

export async function initializeGoToPath ({ commit, state }) {
    if (!state.currentGoToPath) {
        commit('setCurrentGoToPath', router.currentRoute.value.path)
    }
}

async function navigateAfterLogin ({ commit, getters, hasDifferentRole, router, aclSet }) {
    try {
        // Set ACL permissions
        aclSet(getters.permissions)
        // Determine redirect target
        const preLoginPath = getSessionStorage('preLoginPath')
        const lastPage = getSessionStorage('last_page')
        const shouldUseLastPage = lastPage && !hasDifferentRole
        const loginPath = shouldUseLastPage ? lastPage : (preLoginPath || PATH_ENTRANCE)
        delSessionStorage('preLoginPath')
        return router.push({ path: loginPath })
    } catch (e) {
        commit('loginFailed', i18n.global.t('Internal error'))
    }
}
