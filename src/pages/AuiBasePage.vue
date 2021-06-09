<template>
    <q-page
        class="aui-base-page"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot />
        <q-page-sticky
            expand
            position="top"
        >
            <q-toolbar
                inset
                class="bg-secondary"
            >
                <portal-target
                    name="page-toolbar-before"
                />
                <slot
                    name="toolbar-before"
                />
                <q-breadcrumbs
                    v-if="breadcrumbItems && breadcrumbItems.length > 0"
                    class="text-weight-light"
                    active-color="primary"
                    separator-color="primary"
                >
                    <q-breadcrumbs-el
                        v-for="(breadcrumbItem, breadcrumbItemIndex) in breadcrumbItems"
                        :key="breadcrumbItemIndex"
                        :class="(breadcrumbItem.menu && breadcrumbMenuItems(breadcrumbItem.$route).length > 0) ? 'cursor-pointer' : ''"
                        :to="(breadcrumbItem.menu && breadcrumbMenuItems(breadcrumbItem.$route).length > 0) ? undefined : breadcrumbItem.to"
                        :label="$t(breadcrumbItem.label)"
                        :icon="breadcrumbItem.icon"
                        :disable="isPageLoading"
                    >
                        <q-icon
                            v-if="breadcrumbItem.menu"
                            class="q-ml-xs"
                            name="arrow_drop_down"
                            size="sm"
                        />
                        <aui-popup-menu
                            v-if="breadcrumbItem.menu"
                        >
                            <template
                                v-for="(breadcrumbMenuItem, breadcrumbMenuItemIndex) in breadcrumbMenuItems(breadcrumbItem.$route)"
                            >
                                <aui-popup-menu-item
                                    :key="breadcrumbItemIndex + '-' + breadcrumbMenuItemIndex"
                                    :to="breadcrumbMenuItem.to"
                                    :label="$t(breadcrumbMenuItem.label)"
                                    :icon="breadcrumbMenuItem.icon"
                                />
                            </template>
                        </aui-popup-menu>
                    </q-breadcrumbs-el>
                </q-breadcrumbs>
                <slot
                    name="toolbar-breadcrumb-after"
                />
                <portal-target
                    name="page-toolbar-left"
                />
                <slot
                    name="toolbar-left"
                />
                <q-space />
                <portal-target
                    name="page-toolbar-center"
                />
                <slot
                    name="toolbar-center"
                />
                <q-space />
                <portal-target
                    name="page-toolbar-right"
                />
                <slot
                    name="toolbar-right"
                />
                <aui-more-menu
                    :disable="isPageLoading"
                >
                    <portal-target
                        name="page-more-menu-before"
                    />
                    <slot
                        name="more-menu-before"
                    />
                    <aui-popup-menu-item
                        :label="$t('Refresh')"
                        icon="refresh"
                        @click="refresh"
                    />
                    <aui-popup-menu-item
                        :label="(fullscreen)? $t('Exit Fullscreen'):$t('Fullscreen')"
                        :icon="(fullscreen)? 'fullscreen_exit':'fullscreen'"
                        @click="toggleFullscreenEvent"
                    />
                    <portal-target
                        name="page-more-menu-after"
                    />
                    <slot
                        name="more-menu-after"
                    />
                </aui-more-menu>
            </q-toolbar>
            <q-linear-progress
                v-if="isPageLoading"
                indeterminate
                size="2px"
            />
        </q-page-sticky>
    </q-page>
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiMoreMenu from 'components/AuiMoreMenu'
import { mapMutations, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import AuiPopupMenu from 'components/AuiPopupMenu'
export default {
    name: 'AuiBasePage',
    meta () {
        return {
            title: this.pageTitle
        }
    },
    components: {
        AuiPopupMenu,
        AuiMoreMenu,
        AuiPopupMenuItem
    },
    props: {
        breadcrumbItemIntercept: {
            type: Function,
            default ({ item }) {
                return item
            }
        },
        breadcrumbMenuItemIntercept: {
            type: Function,
            default ({ item }) {
                return item
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        rootRoute: {
            type: String,
            default () {
                return this.$route.name
            }
        }
    },
    data () {
        return {}
    },
    computed: {
        ...mapState('layout', [
            'fullscreen'
        ]),
        breadcrumbRoutes () {
            return this.$routeMeta.$routePath(this.$route)
        },
        breadcrumbMenuRoutes () {
            return (route) => {
                return this.$routeMeta.$routeChildren(route)
            }
        },
        breadcrumbItems () {
            const breadcrumbItems = []
            const routes = this.$routeMeta.$routePath(this.$route)
            routes.forEach((route, index) => {
                const routeObject = { name: route.name }
                const item = {
                    label: this.$routeMeta.$label(routeObject) || route.name,
                    icon: this.$routeMeta.$icon(routeObject),
                    to: routeObject,
                    $route: route,
                    menu: route.meta.menu
                }
                breadcrumbItems.push(this.breadcrumbItemIntercept({ route, item, index }))
            })
            return breadcrumbItems
        },
        breadcrumbMenuItems () {
            return (route) => {
                if (route?.meta?.menu) {
                    const items = []
                    const childRoutes = this.$routeMeta.$routeSiblings(route)
                    childRoutes.forEach((childRoute) => {
                        if (childRoute?.meta?.menu) {
                            const routeObject = { name: childRoute.name }
                            const item = {
                                label: this.$routeMeta.$label(routeObject) || childRoute.name,
                                icon: this.$routeMeta.$icon(routeObject),
                                to: routeObject,
                                $route: childRoute
                            }
                            items.push(this.breadcrumbMenuItemIntercept({ route, childRoutes, item }))
                        }
                    })
                    return items
                } else {
                    return []
                }
            }
        },
        isPageLoading () {
            return this.$wait.is(WAIT_PAGE) || this.loading
        },
        pageTitle () {
            const breadcrumbLabels = this.breadcrumbItems.map(b => b.label)
            return breadcrumbLabels.join(' / ')
        }
    },
    methods: {
        ...mapMutations('layout', [
            'toggleFullscreen'
        ]),
        refresh () {
            this.$emit('refresh')
        },
        toggleFullscreenEvent () {
            this.toggleFullscreen()
            if (this.fullscreen) {
                this.$emit('fullscreen')
            } else {
                this.$emit('fullscreen-exit')
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.aui-base-page
    padding-top: ($toolbar-min-height)
</style>
