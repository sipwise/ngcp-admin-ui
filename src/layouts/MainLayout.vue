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
                        style="height: 36px"
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
                                icon="vpn_key"
                                color="primary"
                                :label="$t('Change password')"
                                data-cy="change-password-btn"
                                @click="changePasswordDialog=true"
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
        <q-page-container>
            <router-view />
        </q-page-container>
        <custom-footer />
        <change-password-dialog
            v-model="changePasswordDialog"
            :loading="isDialogRequesting"
            @change-password="changeAdministratorPassword({ password: $event.password })"
        />
        <q-inner-loading
            :showing="loginState === 'loggingOut'"
        />
    </q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SipwiseLogo from '../components/SipwiseLogo'
import AuiSelectionLanguage from '../components/AuiSelectionLanguage'
import {
    mapActions,
    mapMutations,
    mapGetters,
    mapState
} from 'vuex'
import CustomFooter from '../components/CustomFooter'
import EntityListMenuItem from '../components/EntityListMenuItem'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiHelpButton from 'components/AuiHelpButton'
export default {
    name: 'MainLayout',
    components: {
        AuiHelpButton,
        ChangePasswordDialog,
        EntityListMenuItem,
        CustomFooter,
        MainMenu,
        SipwiseLogo,
        AuiSelectionLanguage
    },
    data () {
        return {
            changePasswordDialog: false,
            showMaintenanceButton: false,
            filterMenuItem: ''
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
            'isMaintenanceMode'
        ]),
        pinMenuButtonIcon () {
            if (!this.menuPinned) {
                return 'fas fa-thumbtack'
            } else {
                return 'fas fa-caret-left'
            }
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
                this.changePasswordDialog = false
                showGlobalSuccessMessage(this.$t('Password changed successfully'))
            }
        },
        '$q.fullscreen.isActive' (value) {
            if (!value) {
                this.disableFullscreen()
            }
        }
    },
    mounted () {
        this.loadMenuState()
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
            'changeAdministratorPassword'
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
