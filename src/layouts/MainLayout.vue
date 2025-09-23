<template>
    <q-layout
        ref="layout"
        :view="view"
    >
        <q-drawer
            v-model="drawerLeftVisible"
            behavior="default"
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
                    ref="maintenanceMessage"
                    class="text-no-wrap full-width text-center overflow-hidden"
                >
                    {{ $t('Maintenance mode is enabled! Please do not perform any changes until maintenance mode has been switched off!') }}
                </div>
                <q-btn
                    v-if="showMaintenanceButton"
                    icon="more_horiz"
                    flat
                    dense
                    round
                    @click="showMaintenanceMessage"
                />
                <q-resize-observer
                    debounce="200"
                    @resize="checkWindowSize"
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
                <q-btn
                    v-if="isLoggedIn"
                    flat
                    dense
                    icon="account_circle"
                    aria-label="UserMenu"
                    :label="userName"
                    data-cy="usermenu-btn"
                >
                    <q-menu
                        ref="topmenu"
                        transition-show="jump-down"
                        transition-hide="jump-up"
                        square
                        fit
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
                    </q-menu>
                </q-btn>
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
            showMaintenanceButton: false,
            filterMenuItem: '',
            showMenu: true
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
        checkWindowSize () {
            const divElement = this.$refs?.maintenanceMessage
            this.showMaintenanceButton = divElement.scrollWidth -
                divElement.clientWidth > 0
        },
        showMaintenanceMessage () {
            showGlobalErrorMessage(this.$t('Maintenance mode is enabled! Please do not perform any changes until maintenance mode has been switched off!'))
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
