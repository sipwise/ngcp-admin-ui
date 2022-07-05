<template>
    <q-layout
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
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import AuiDetailPageMenu from 'components/AuiDetailPageMenu'
import { sortItemsWithLabelAlphabetically } from 'src/helpers/sorting'
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
        }
    },
    computed: {
        menuItems () {
            const items = []
            if (this.resourceObject) {
                const routeData = this.$router.resolve({
                    name: this.detailsPageRouteName,
                    params: { id: this.$route.params.id }
                })
                const routes = this.$routeMeta.$routeChildren(routeData.route)
                routes.forEach((route) => {
                    if (this.$routeMeta.$isRouteAccessible(route) && !route.meta.hideFromPageMenu) {
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
                sortItemsWithLabelAlphabetically(items)
            }
            return items
        }
    },
    watch: {
        $route (route) {
            this.redirectToTheSubpage()
            if (route?.meta?.v1DetailsPageSectionId) {
                // if we set this value the V1 UI will display required DetailPage's section as opened after clicking "Go to old Admin Panel" button
                localStorage.setItem('lastTab', route?.meta?.v1DetailsPageSectionId)
            }
        }
    },
    mounted () {
        this.redirectToTheSubpage()
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
