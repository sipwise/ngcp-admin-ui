<template>
    <aui-base-page
        :key="pageKey"
        :breadcrumb-items="[
            ...breadcrumbItems
        ]"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
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
                            :icon="item.icon"
                            :to="item.to"
                        />
                    </template>
                </aui-popup-menu>
            </q-btn>
        </template>
        <slot />
    </aui-base-page>
</template>

<script>
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import {
    WAIT_CONTEXT_AWARE_PAGE, WAIT_SUB_CONTEXT
} from 'src/constants'
import AuiPopupMenu from 'components/AuiPopupMenu'
import AuiBasePage from 'pages/AuiBasePage'

export default {
    name: 'AuiContextAwarePage',
    components: {
        AuiBasePage,
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
        loading () {
            return this.$wait.is(WAIT_CONTEXT_AWARE_PAGE) ||
                this.$wait.is(WAIT_SUB_CONTEXT)
        },
        ...mapState('layout', [
            'fullscreen'
        ]),
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects',
            'subContextRoute'
        ]),
        breadcrumbItems () {
            if (this.resourceObject) {
                return [
                    {
                        label: this.contextName({
                            resourceObject: this.resourceObject,
                            resourceRelatedObjects: this.resourceRelatedObjects,
                            resourceRelatedSubObjects: this.resourceRelatedSubObjects
                        }),
                        to: { name: this.defaultSubContextRoute }
                    }
                ]
            } else {
                return []
            }
        },
        breadcrumbMenuItems () {
            const items = []
            this.subContextRoutes.forEach((route) => {
                if (route !== this.subContextRoute) {
                    const routeObject = { name: route, params: { id: this.resourceId } }
                    items.push({
                        name: route,
                        to: routeObject,
                        label: this.$routeMeta.$label(routeObject),
                        icon: this.$routeMeta.$icon(routeObject)
                    })
                }
            })
            return items
        },
        resourceId () {
            return this.$route.params.id
        }
    },
    watch: {
        $route (to) {
            this.setCurrentSubContextState(to)
        },
        loading () {
            this.$emit('loading')
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
                    params: { id: this.$route.params.id }
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
