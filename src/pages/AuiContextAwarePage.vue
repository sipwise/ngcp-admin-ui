<template>
    <aui-page
        :key="pageKey"
        :root-route="contextListRoute"
        :breadcrumb-items="[
            ...breadcrumbItems
        ]"
        :loading="isPageLoading"
        @refresh="reloadContextInternal"
    >
        <template
            v-slot:toolbar-breadcrumb-after
        >
            <q-btn
                v-if="breadcrumbMenuItems && breadcrumbMenuItems.length > 0"
                class="q-ml-sm"
                icon="arrow_drop_down"
                flat
                size="md"
                color="primary"
                dense
            >
                <aui-popup-menu>
                    <template
                        v-for="(item, index) in breadcrumbMenuItems"
                    >
                        <aui-popup-menu-item
                            :key="index"
                            :label="item.label"
                            :to="{ name: item.name, params: { id: resourceId } }"
                        />
                    </template>
                </aui-popup-menu>
            </q-btn>
        </template>
        <slot />
    </aui-page>
</template>

<script>
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import {
    WAIT_CONTEXT_AWARE_PAGE
} from 'src/constants'
import AuiPopupMenu from 'components/AuiPopupMenu'
import { mapWaitingGetters } from 'vue-wait'
import AuiPage from 'pages/AuiPage'

export default {
    name: 'AuiContextAwarePage',
    components: {
        AuiPage,
        AuiPopupMenu,
        AuiPopupMenuItem
    },
    props: {
        resource: {
            type: String,
            required: true
        },
        resourceRelations: {
            type: Object,
            default: null
        },
        contextName: {
            type: Function,
            required: true
        },
        contextListRoute: {
            type: String,
            required: true
        },
        contextRootRoute: {
            type: String,
            required: true
        },
        defaultSubContextRoute: {
            type: String,
            default: null
        },
        subContextRoutes: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            pageKey: Math.random()
        }
    },
    computed: {
        ...mapWaitingGetters({
            isPageLoading: WAIT_CONTEXT_AWARE_PAGE
        }),
        ...mapState('layout', [
            'fullscreen'
        ]),
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'subContextRoute'
        ]),
        breadcrumbItems () {
            if (this.resourceObject) {
                const items = [
                    {
                        to: { name: this.contextRootRoute },
                        label: this.contextName({
                            resourceObject: this.resourceObject,
                            resourceRelatedObjects: this.resourceRelatedObjects
                        })
                    }
                ]
                if (this.subContextRoute) {
                    items.push({
                        to: { name: this.subContextRoute },
                        label: this.subContextRouteData.route.meta.label,
                        icon: this.subContextRouteData.route.meta.icon
                    })
                }
                return items
            } else {
                return []
            }
        },
        breadcrumbMenuItems () {
            const items = []
            this.subContextRoutes.forEach((route) => {
                if (route !== this.subContextRoute) {
                    const routeData = this.$router.resolve({ name: route })
                    items.push({
                        name: route,
                        to: { name: route },
                        label: routeData.route.meta.label,
                        icon: routeData.route.meta.label
                    })
                }
            })
            return items
        },
        contextListRouteData () {
            return this.$router.resolve({ name: this.contextListRoute })
        },
        contextRootRouteData () {
            return this.$router.resolve({ name: this.contextRootRoute })
        },
        subContextRouteData () {
            return this.$router.resolve({ name: this.subContextRoute })
        },
        resourceId () {
            return this.$route.params.id
        }
    },
    watch: {
        $route (to) {
            this.setCurrentSubContextState(to)
        }
    },
    async mounted () {
        await this.loadContext({
            resource: this.resource,
            resourceId: this.resourceId,
            resourceRelations: this.resourceRelations
        })
        this.setCurrentSubContextState(this.$route)
    },
    methods: {
        ...mapMutations('page', [
            'setCurrentSubContext'
        ]),
        ...mapActions('page', [
            'loadContext',
            'reloadContext'
        ]),
        reloadContextInternal () {
            this.pageKey = Math.random()
            this.reloadContext()
        },
        setCurrentSubContextState (route) {
            if (this.defaultSubContextRoute && route.name === this.contextRootRoute) {
                this.$router.push({
                    name: this.defaultSubContextRoute,
                    params: {
                        id: this.$route.params.id
                    }
                })
            }
            if (this.subContextRoutes.indexOf(route.name) !== -1) {
                this.setCurrentSubContext(route.name)
            } else {
                this.setCurrentSubContext(null)
            }
        }
    }
}
</script>
