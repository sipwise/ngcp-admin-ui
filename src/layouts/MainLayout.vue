<template>
    <q-layout
        ref="layout"
        :view="view"
    >
        <q-drawer
            v-model="drawerLeftVisible"
            behavior="desktop"
            class="bg-secondary"
            show-if-above
            :mini="menuMinimized"
            @mouseleave="minimizeMenu"
            @mouseenter="maximizeMenu"
        >
            <div
                class="absolute-top-left absolute-top-right drawer-head"
            >
                <div
                    class="row justify-end content-center drawer-head-row q-pr-sm"
                >
                    <q-btn
                        v-if="!menuMinimized"
                        :icon="pinMenuButtonIcon"
                        color="grey-9"
                        flat
                        dense
                        round
                        @click="pinMenu"
                    />
                </div>
                <div
                    class="row justify-around content-center drawer-head-row q-pl-sm q-pr-sm"
                >
                    <q-input
                        v-if="!menuMinimized"
                        v-model="filterMenuItem"
                        class="full-width"
                        dense
                        clearable
                        :label="$t('Search menu')"
                    >
                        <template
                            #prepend
                        >
                            <q-icon
                                color="grey"
                                name="search"
                            />
                        </template>
                    </q-input>
                </div>
            </div>
            <q-scroll-area
                class="absolute-top main-menu-container"
            >
                <main-menu
                    :user="user"
                    :filter="filterMenuItem"
                    class="main-menu"
                />
            </q-scroll-area>
            <div
                class="absolute-bottom-left absolute-bottom-right bg-secondary copyright"
            >
                <div
                    v-if="!menuMinimized"
                >
                    <div class="row justify-center content-center">
                        <router-link
                            v-if="showNgcpVersion"
                            class="text-primary q-mr-xs"
                            :to="{ name: 'ngcpVersionStatistics' }"
                        >
                            {{ ngcpVersion }}
                        </router-link>
                        <span
                            class="no-wrap q-mr-xs"
                        >
                            © 2013 - {{ currentYear }}
                        </span>
                        <a
                            class="text-primary"
                            href="http://www.sipwise.com"
                        >Sipwise GmbH</a>
                    </div>
                    <div class="row justify-center content-center">
                        {{ $t('All rights reserved') }}.
                    </div>
                </div>
                <div
                    v-else
                    class="row justify-center content-center full-height"
                >
                    <q-icon
                        name="copyright"
                        size="sm"
                        color="grey-9"
                    />
                </div>
            </div>
        </q-drawer>
        <q-header
            :model-value="headerVisible"
        >
            <q-bar
                v-if="isMaintenanceMode"
                class="bg-negative text-white"
            >
                <div
                    :ref="barNotifications.maintenance.ref"
                    class="text-no-wrap full-width text-center overflow-hidden"
                >
                    {{ barNotifications.maintenance.translationKey }}
                </div>
                <q-btn
                    v-if="showBarActionButton"
                    icon="more_horiz"
                    flat
                    dense
                    round
                    @click="showBarMessage(
                        barNotifications.maintenance.ref,
                        barNotifications.maintenance.translationKey,
                        barNotifications.maintenance.notifyOptions
                    )"
                />
                <q-resize-observer
                    debounce="200"
                    @resize="checkWindowSize(barNotifications.maintenance.ref)"
                />
            </q-bar>
            <q-bar
                v-if="!isPlatformCE && !hasValidLicenses"
                class="bg-orange-8 text-white"
            >
                <div
                    :ref="barNotifications.licenseExpired.ref"
                    class="text-no-wrap full-width text-center overflow-hidden"
                >
                    {{ barNotifications.licenseExpired.translationKey }}
                </div>
                <q-btn
                    v-if="showBarActionButton"
                    icon="more_horiz"
                    flat
                    dense
                    round
                    @click="showBarMessage(
                        barNotifications.licenseExpired.ref,
                        barNotifications.licenseExpired.translationKey,
                        barNotifications.licenseExpired.notifyOptions
                    )"
                />
                <q-resize-observer
                    debounce="200"
                    @resize="checkWindowSize(barNotifications.licenseExpired.ref)"
                />
            </q-bar>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleDrawerLeft"
                />
                <router-link to="/">
                    <sipwise-logo
                        class="q-ml-sm"
                        style="height: 36px; margin-top: 5px"
                        color="light"
                    />
                </router-link>
                <q-space />
                <q-btn
                    :icon="(favPages[$route.path])? 'star' : 'star_outline'"
                    color="warning"
                    flat
                    dense
                    round
                    @click="toggleFavPage({
                        route: $route
                    })"
                />
                <aui-selection-language
                    icon-color="white"
                />
                <aui-help-button />
                <q-btn-dropdown
                    v-if="isLoggedIn"
                    flat
                    dense
                    icon="account_circle"
                    aria-label="UserMenu"
                    :label="userName"
                    data-cy="usermenu-btn"
                    menu-anchor="bottom right"
                    menu-self="top right"
                >
                    <q-list>
                        <entity-list-menu-item
                            v-if="canUserResetPassword"
                            icon="vpn_key"
                            color="primary"
                            :label="$t('Reset password')"
                            data-cy="reset-password-btn"
                            @click="resetPasswordDialog=true"
                        />
                        <entity-list-menu-item
                            icon="logout"
                            color="primary"
                            :label="$t('Logout')"
                            data-cy="logout-btn"
                            @click="logout"
                        />
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>
        </q-header>

        <q-page-container v-if="!showMenu">
            <q-banner
                class="bg-grey-3"
                dense
                inline-actions
            >
                <template #avatar>
                    <q-icon
                        name="fas fa-tools"
                        color="black"
                        size="2em"
                    />
                </template>
                {{ $t('Please contact your Account Manager to activate this feature') }}
            </q-banner>
        </q-page-container>

        <q-page-container v-if="showMenu">
            <router-view />
        </q-page-container>
        <custom-footer />
        <reset-password-dialog
            v-model="resetPasswordDialog"
            :loading="isDialogRequesting"
            @reset-password="resetAdministratorPassword({ password: $event.password })"
        />
        <q-inner-loading
            :showing="loginState === 'loggingOut'"
        />
    </q-layout>
</template>

<script>
import AuiHelpButton from 'components/AuiHelpButton'
import AuiSelectionLanguage from 'src/components/AuiSelectionLanguage'
import CustomFooter from 'src/components/CustomFooter'
import EntityListMenuItem from 'src/components/EntityListMenuItem'
import MainMenu from 'src/components/MainMenu'
import SipwiseLogo from 'src/components/SipwiseLogo'
import ResetPasswordDialog from 'src/components/dialog/ResetPasswordDialog'
import { PLATFORM_CE } from 'src/constants'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState
} from 'vuex'
export default {
    name: 'MainLayout',
    components: {
        AuiHelpButton,
        ResetPasswordDialog,
        EntityListMenuItem,
        CustomFooter,
        MainMenu,
        SipwiseLogo,
        AuiSelectionLanguage
    },
    data () {
        return {
            resetPasswordDialog: false,
            showBarActionButton: false,
            filterMenuItem: '',
            showMenu: true,
            barNotifications: {
                maintenance: {
                    ref: 'maintenanceMessage',
                    translationKey: this.$t('Maintenance mode is enabled! Please do not perform any changes until maintenance mode has been switched off!'),
                    notifyOptions: {
                        color: 'negative',
                        textColor: 'white',
                        icon: 'warning'
                    }
                },
                licenseExpired: {
                    ref: 'expiredLicenseMessage',
                    translationKey: this.$t('License Expired Message'),
                    notifyOptions: {
                        color: 'orange-8',
                        textColor: 'white',
                        icon: 'warning'
                    }
                }
            }
        }
    },
    computed: {
        ...mapState('layout', [
            'view',
            'fullscreen',
            'headerVisible',
            'drawerLeftVisible'
        ]),
        ...mapState('user', [
            'user',
            'menuPinned',
            'menuMinimized',
            'loginState',
            'favPages',
            'platformInfo'
        ]),
        ...mapGetters('user', [
            'userName',
            'isLoggedIn',
            'isDialogRequesting',
            'hasDialogSucceeded',
            'isMaintenanceMode',
            'hasLicenses',
            'canUserResetPassword'
        ]),
        pinMenuButtonIcon () {
            if (!this.menuPinned) {
                return 'fas fa-thumbtack'
            }
            return 'fas fa-caret-left'
        },
        pinMenuButtonClasses () {
            const classes = ['pin-menu-button']
            if (!this.menuMinimized) {
                classes.push('justify-end')
                classes.push('q-pl-sm q-pr-sm')
            } else {
                classes.push('justify-center')
            }
            return classes
        },
        showNgcpVersion () {
            return this.$aclCan('read', 'ngcp.version')
        },
        ngcpVersion () {
            return this.platformInfo?.ngcp_version
        },
        currentYear () {
            return new Date().getFullYear()
        },
        hasValidLicenses () {
            return this.platformInfo?.license_meta?.check === 'ok' ?? true
        },
        isPlatformCE () {
            return this.platformInfo?.type === PLATFORM_CE ?? true
        }
    },
    watch: {
        hasDialogSucceeded (value) {
            if (value === true) {
                this.resetPasswordDialog = false
                showGlobalSuccessMessage(this.$t('Password reset successfully'))
            }
        },
        '$q.fullscreen.isActive' (value) {
            if (!value) {
                this.disableFullscreen()
            }
        },
        $route (route) {
            // this allows the app to handle licenses for the details menus
            // in the AuiDetailsPage component
            this.showMenu = route.path.includes('details') ? true : this.hasLicenses(route.meta.licenses)
        }
    },
    mounted () {
        this.loadMenuState()
        this.showMenu = this.$route.path.includes('details') ? true : this.hasLicenses(this.$route.meta.licenses)
    },
    methods: {
        ...mapMutations('layout', [
            'enableFullscreen',
            'disableFullscreen',
            'toggleDrawerLeft'
        ]),
        ...mapMutations('user', [
            'minimizeMenu',
            'maximizeMenu'
        ]),
        ...mapActions('user', [
            'logout',
            'pinMenu',
            'loadMenuState',
            'passwordReset',
            'toggleFavPage'
        ]),
        ...mapActions('administrators', [
            'resetAdministratorPassword'
        ]),
        checkWindowSize (namedRef) {
            const divElement = namedRef ? this.$refs?.[namedRef] : null
            if (divElement) {
                this.showBarActionButton = (divElement.scrollWidth - divElement.clientWidth) > 0
            } else {
                this.showBarActionButton = false
            }
        },
        showBarMessage (refName, fallbackKey = null, notifyOptions = null) {
            const refElement = this.$refs?.[refName]
            const message = refElement?.innerText?.trim()
            if (message) {
                showGlobalErrorMessage(message, notifyOptions)
            } else if (fallbackKey) {
                showGlobalErrorMessage(fallbackKey, notifyOptions)
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import "../css/quasar.variables.sass"
$copyright-height: 75px
.drawer-head
    height: $toolbar-min-height * 2
.drawer-head-row
    height: $toolbar-min-height
.main-menu
    margin-bottom: $flex-gutter-lg
.main-menu-container
    top: $toolbar-min-height * 2
    bottom: $copyright-height
.copyright
    height: $copyright-height
    text-align: center
.pin-menu-button
    height: $toolbar-min-height
</style>
