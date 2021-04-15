<template>
    <q-page
        :key="pageKey"
        class="aui-page q-pa-lg"
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
                    v-if="internalBreadcrumbItems.length > 0 && !loading"
                    class="text-weight-light"
                    active-color="primary"
                >
                    <q-breadcrumbs-el
                        v-for="(breadcrumbItem, index) in internalBreadcrumbItems"
                        :key="index"
                        :to="breadcrumbItem.to"
                        :label="breadcrumbItem.label"
                        :icon="breadcrumbItem.icon"
                        :active-class="(index === 0)? 'text-weight-bold': ''"
                    />
                </q-breadcrumbs>
                <q-skeleton
                    v-if="loading"
                    type="text"
                    width="256px"
                />
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
                    :disable="loading"
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
                v-if="loading"
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
export default {
    name: 'AuiPage',
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
        return {
            pageKey: Math.random()
        }
    },
    computed: {
        ...mapState('layout', [
            'fullscreen'
        ]),
        rootRouteData () {
            return this.$router.resolve({ name: this.rootRoute }).route
        },
        rootLabel () {
            return _.get(this.rootRouteData, 'meta.label', this.$t('Unknown route'))
        },
        rootIcon () {
            return _.get(this.rootRouteData, 'meta.icon')
        },
        rootTo () {
            if (this.breadcrumbItems.length === 0) {
                return null
            } else {
                return { name: this.rootRouteData.name }
            }
        },
        internalBreadcrumbItems () {
            const items = []
            items.push({
                label: this.rootLabel,
                icon: this.rootIcon,
                to: this.rootTo
            })
            this.breadcrumbItems.forEach((item) => {
                if (_.isString(item)) {
                    const routeData = this.$router.resolve({ name: item })
                    if (routeData && routeData.route) {
                        items.push({
                            label: _.get(routeData, 'route.meta.label', this.$t('Unknown route')),
                            icon: _.get(routeData, 'route.meta.icon'),
                            to: _.get(routeData, 'route.name')
                        })
                    }
                } else {
                    items.push(item)
                }
            })
            return items
        }
    },
    methods: {
        ...mapMutations('layout', [
            'toggleFullscreen'
        ]),
        refresh () {
            this.pageKey = Math.random()
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
.aui-page
    padding-top: ($toolbar-min-height + $flex-gutter-sm + 16)
</style>
