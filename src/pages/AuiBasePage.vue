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
                    v-if="internalBreadcrumbItems.length > 0"
                    class="text-weight-light"
                    active-color="primary"
                >
                    <q-breadcrumbs-el
                        v-for="(breadcrumbItem, index) in internalBreadcrumbItems"
                        :key="index"
                        :to="(breadcrumbItem.to) ? breadcrumbItem.to : undefined"
                        :label="breadcrumbItem.label"
                        :icon="breadcrumbItem.icon"
                        :disable="isPageLoading"
                        :active-class="(index === 0)? 'text-weight-bold': ''"
                    />
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
import _ from 'lodash'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiMoreMenu from 'components/AuiMoreMenu'
import { mapMutations, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiBasePage',
    components: {
        AuiMoreMenu,
        AuiPopupMenuItem
    },
    props: {
        breadcrumbItems: {
            type: Array,
            default () {
                return []
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
        internalBreadcrumbItems () {
            const items = []
            if (this.$route.meta.listRoute) {
                const route = { name: this.$route.meta.listRoute }
                items.push({
                    label: this.$routeMeta.$label(route),
                    icon: this.$routeMeta.$icon(route),
                    to: route
                })
            }
            this.breadcrumbItems.forEach((item) => {
                if (_.isString(item)) {
                    const routeItem = { name: item }
                    items.push({
                        label: this.$routeMeta.$label(routeItem),
                        icon: this.$routeMeta.$icon(routeItem),
                        to: routeItem
                    })
                } else {
                    items.push(item)
                }
            })
            items.push({
                label: this.$routeMeta.$label({ name: this.$route.name }),
                icon: this.$routeMeta.$icon({ name: this.$route.name })
            })
            return items
        },
        isPageLoading () {
            return this.$wait.is(WAIT_PAGE) || this.loading
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
