<template>
    <q-layout
        v-if="isComponentMounted"
        view="hHh LpR fFf"
        container
        style="min-height: calc(100vh - 150px)"
    >
        <q-drawer
            behavior="desktop"
            side="left"
            :mini="false"
            :width="280"
            show-if-above
        >
            <aui-detail-page-menu
                :menu-items="menuItems"
            />
        </q-drawer>

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
    </q-layout>
</template>

<script>
import AuiDetailPageMenu from 'components/AuiDetailPageMenu'
import { sortItemsWithLabelAlphabetically } from 'src/helpers/sorting'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'AuiDetailsPage',
    components: { AuiDetailPageMenu },
    props: {
        detailsPageRouteName: {
            type: String,
            default: ''
        },
        redirectToSubpageRoute: {
            type: Object,
            default: null
        },
        menuItemsModifier: {
            type: Function,
            default ({ item }) {
                return item
            }
        },
        resourceObject: {
            type: Object,
            default: null
        },
        disableSort: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            showMenu: true,
            isComponentMounted: true
        }
    },
    computed: {
        ...mapGetters('user', [
            'hasLicenses'
        ]),
        ...mapState('user', [
            'loginState'
        ]),
        menuItems () {
            const items = []
            if (this.resourceObject) {
                const routeData = this.$router.resolve({
                    name: this.detailsPageRouteName,
                    params: { id: this.$route.params.id }
                })
                const routes = this.$routeMeta.$routeChildren(routeData)
                routes.forEach((route) => {
                    if (!route.meta.hideFromPageMenu && this.$routeMeta.$isRouteAccessible(route)) {
                        const menuItem = this.menuItemsModifier({
                            item: {
                                label: route.meta.label,
                                icon: route.meta.icon,
                                to: { name: route.name, params: { id: this.resourceObject.id } }
                            },
                            route,
                            resourceObject: this.resourceObject
                        })
                        if (menuItem) {
                            items.push(menuItem)
                        }
                    }
                })
                if (!this.disableSort) {
                    sortItemsWithLabelAlphabetically(items)
                }
            }
            return items
        }
    },
    watch: {
        $route (route) {
            this.showMenu = this.hasLicenses(route.meta.licenses)
            this.redirectToTheSubpage()
            if (route?.meta?.v1DetailsPageSectionId) {
                // if we set this value the V1 UI will display required DetailPage's section as opened after clicking "Go to old Admin Panel" button
                localStorage.setItem('lastTab', route?.meta?.v1DetailsPageSectionId)
            }
        },
        loginState (newState) {
            if (newState === 'loggingOut') {
                this.isComponentMounted = false
            }
        }
    },
    mounted () {
        this.redirectToTheSubpage()
        this.showMenu = this.hasLicenses(this.$route.meta.licenses)
    },
    methods: {
        redirectToTheSubpage () {
            if (this.detailsPageRouteName && this.redirectToSubpageRoute) {
                // Automatically redirects to the first details sub page
                // Note: We cannot use "redirect" option in router config for automatic redirection because of current
                //       implementation "Vue.prototype.$routeMeta" helpers
                if (this.$route.name === this.detailsPageRouteName) {
                    this.$router.replace(this.redirectToSubpageRoute)
                }
            }
        }
    }
}
</script>
