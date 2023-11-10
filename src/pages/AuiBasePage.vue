<template>
    <q-page
        class="aui-base-page"
        v-bind="$attrs"
    >
        <slot />
        <q-page-sticky
            expand
            position="top"
            class="aui-page-sticky-fix"
        >
            <q-toolbar
                class="bg-secondary q-pl-lg"
            >
                <portal-target
                    name="page-toolbar-before"
                />
                <slot
                    name="toolbar-before"
                />
                <q-breadcrumbs
                    v-if="breadcrumbItems && breadcrumbItems.length > 0"
                    class="text-weight-light q-mr-md"
                    active-color="primary"
                    separator-color="primary"
                >
                    <q-breadcrumbs-el
                        v-for="(breadcrumbItem, breadcrumbItemIndex) in breadcrumbItems"
                        :key="breadcrumbItemIndex"
                        :class="(breadcrumbItem.menu && breadcrumbMenuItems(breadcrumbItem.$route).length > 0) ? 'cursor-pointer' : ''"
                        :to="(breadcrumbItem.menu && breadcrumbMenuItems(breadcrumbItem.$route).length > 0) ? undefined : breadcrumbItem.to"
                        :label="translateBreadCrumbLabel(breadcrumbItem.label)"
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
                            <aui-popup-menu-item
                                v-for="(breadcrumbMenuItem, breadcrumbMenuItemIndex) in breadcrumbMenuItems(breadcrumbItem.$route)"
                                :key="breadcrumbItemIndex + '-' + breadcrumbMenuItemIndex"
                                :to="breadcrumbMenuItem.to"
                                :label="$t(breadcrumbMenuItem.label)"
                                :icon="breadcrumbMenuItem.icon"
                            />
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
                    <aui-popup-menu-item
                        v-if="journalRouteName && $aclCan('read', 'entity.journals')"
                        :label="$t('Journal')"
                        icon="list_alt"
                        @click="$router.push({ name: journalRouteName })"
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
import { sortItemsWithLabelAlphabetically } from 'src/helpers/sorting'
import _ from 'lodash'
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
            default ($route) {
                return $route.name
            }
        }
    },
    emits: ['refresh', 'fullscreen', 'fullscreen-exit'],
    data () {
        return {}
    },
    computed: {
        ...mapState('layout', [
            'fullscreen'
        ]),
        ...mapState('user', [
            'user'
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
                const canAccess = route.children ? this.$aclCan(route.children[0].meta?.$p?.operation, route.children[0].meta?.$p?.resource) : true
                let label = route.meta.label
                if (this.$store.state.page[route.name] && _.isString(route.meta.contextLabel)) {
                    label = this.$store.state.page[route.name][route.meta.contextLabel]
                } else if (this.$store.state.page[route.name] && _.isFunction(route.meta.contextLabel)) {
                    label = route.meta.contextLabel({
                        currentRoute: this.$route,
                        route,
                        index,
                        resourceObject: this.$store.state.page[route.name]
                    })
                } else if (route.meta.contextStatic && _.isFunction(route.meta.contextLabel)) {
                    label = route.meta.contextLabel({
                        currentRoute: this.$route,
                        route,
                        index
                    })
                }
                const item = {
                    label: label,
                    icon: route.meta.icon,
                    to: canAccess ? { name: route.name } : undefined,
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
                    const routeName = route?.name
                    const items = []
                    const childRoutes = this.$routeMeta.$routeSiblings(route)
                    childRoutes.forEach((childRoute) => {
                        let canAcl = this.$aclCan(childRoute?.meta?.$p?.operation, childRoute?.meta?.$p?.resource)
                        if (childRoute?.meta?.$p?.resource === 'entity.admins') {
                            canAcl = canAcl || this.$aclCan(
                                childRoute?.meta?.$p?.operation,
                                childRoute?.meta?.$p?.resource,
                                { id: this.$route.params.id },
                                this.user
                            )
                        }
                        if (canAcl) {
                            const routeObject = { name: childRoute.name }
                            const item = {
                                label: this.$routeMeta.$label(routeObject) || childRoute.name,
                                icon: this.$routeMeta.$icon(routeObject),
                                to: routeObject,
                                $route: childRoute
                            }
                            if (this.$route.query) {
                                Object.keys(this.$route.query).forEach((query) => {
                                    if (!item.to.query) {
                                        item.to.query = {}
                                    }
                                    item.to.query[query] = this.$route.query[query]
                                })
                            }
                            items.push(this.breadcrumbMenuItemIntercept({ route, childRoutes, item }))
                        }
                    })
                    sortItemsWithLabelAlphabetically(items)
                    if (routeName === 'billingProfileFees') {
                        const newListItems = items.filter(item => item.label !== 'Add')
                        return newListItems
                    }
                    return items
                } else {
                    return []
                }
            }
        },
        isPageLoading () {
            return this.$wait.is(WAIT_PAGE) || this.loading || this.$wait.is('aui-data-table-*')
        },
        pageTitle () {
            const breadcrumbLabels = this.breadcrumbItems.map(b => b.label)
            return breadcrumbLabels.join(' / ')
        },
        journalRouteName () {
            const routePath = this.$routeMeta.$routePath(this.$route)
            if (routePath[0]?.meta?.journalRouteName && routePath[0].meta.journalRouteName !== this.$route.name) {
                return routePath[0].meta.journalRouteName
            }
            return null
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
        },
        translateBreadCrumbLabel (label) {
            if (label) {
                return this.$t(label.replaceAll('@', "{'@'}"))
            }
            return null
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-page
    padding-top: ($toolbar-min-height)

    .proxy-iframe-wrapper, .proxy-iframe
        height: calc(100vh - 3 * #{$toolbar-min-height} - #{$aui-proxy-warning-pnl-height}) !important

</style>
