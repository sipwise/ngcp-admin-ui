<template>
    <q-layout
        ref="layout"
        :view="view"
    >
        <q-header
            :value="headerVisible"
        >
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
                    :icon="(favPages[$route.name || $route.path])? 'star' : 'star_outline'"
                    color="warning"
                    flat
                    dense
                    round
                    @click="toggleFavPage($route)"
                />
                <aui-selection-language
                    icon-color="white"
                />
                <q-btn
                    v-if="isLoggedIn"
                    flat
                    dense
                    icon="account_circle"
                    aria-label="UserMenu"
                    :label="userName"
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
                                icon="logout"
                                color="primary"
                                :label="$t('Logout')"
                                @click="logout"
                            />
                            <entity-list-menu-item
                                icon="vpn_key"
                                color="primary"
                                :label="$t('Change password')"
                                @click="changePasswordDialog=true"
                            />
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="drawerLeftVisible"
            behavior="desktop"
            content-class="bg-secondary"
            show-if-above
            :mini="menuMinimized"
            @mouseleave="minimizeMenu"
            @mouseenter="maximizeMenu"
        >
            <div
                :class="pinMenuButtonClasses"
            >
                <div
                    class="col col-auto"
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
            </div>
            <main-menu
                :user="user"
            />
        </q-drawer>
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
import { APP_NAME } from 'src/constants'
export default {
    name: 'MainLayout',
    meta () {
        return {
            title: this.pageTitle,
            titleTemplate: title => `${APP_NAME} - ${title}`
        }
    },
    components: {
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
            pageTitle: ''
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
            'currentPathIframeError',
            'favPages'
        ]),
        ...mapGetters('user', [
            'userName',
            'isLoggedIn',
            'isDialogRequesting',
            'hasDialogSucceeded'
        ]),
        pinMenuButtonIcon () {
            if (!this.menuPinned) {
                return 'fas fa-thumbtack'
            } else {
                return 'fas fa-caret-left'
            }
        },
        pinMenuButtonClasses () {
            const classes = ['pin-menu-button row items-center']
            if (!this.menuMinimized) {
                classes.push('justify-end')
                classes.push('q-pl-sm q-pr-sm')
            } else {
                classes.push('justify-center')
            }
            return classes
        }
    },
    watch: {
        $route (value) {
            this.updateTitle(value)
        },
        hasDialogSucceeded (value) {
            if (value === true) {
                this.changePasswordDialog = false
                showGlobalSuccessMessage(this.$t('Password changed successfully'))
            }
        },
        currentPathIframeError (error) {
            if (error) {
                showGlobalErrorMessage(error)
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
        this.updateTitle(this.$route)
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
        updateTitle: function (route) {
            if (route) {
                this.pageTitle = this.$routeMeta.$label(route) || route.name || ''
            } else {
                this.pageTitle = ''
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
    @import "../css/quasar.variables.sass"
    .pin-menu-button
        height: 50px
</style>
