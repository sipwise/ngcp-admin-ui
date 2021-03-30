<template>
    <q-page
        ref="page"
        :key="pageKey"
        class="aui-context-aware-page q-pa-lg bg-white"
    >
        <slot />
        <q-page-sticky
            expand
            position="top"
        >
            <q-toolbar
                class="bg-white"
            >
                <q-breadcrumbs
                    class="text-weight-light"
                    active-color="primary"
                >
                    <q-breadcrumbs-el
                        :to="{ name: breadcrumbRootItem.route }"
                        :label="breadcrumbRootItem.label"
                        :icon="breadcrumbRootItem.icon"
                    />
                    <q-breadcrumbs-el
                        :to="contextTo"
                        :label="contextName({
                            resourceObject,
                            resourceRelatedObjects
                        })"
                    />
                    <q-breadcrumbs-el
                        v-if="selectedSubContext"
                        :to="{ name: selectedSubContext.route }"
                        :label="selectedSubContext.label"
                        :icon="(selectedSubContext.icon)?selectedSubContext.icon:undefined"
                    />
                </q-breadcrumbs>
                <q-btn
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
                                v-if="selectedSubContext && item.route !== selectedSubContext.route"
                                :key="index"
                                :label="item.label"
                                @click="$router.push({ name: item.route, params: { id: resourceId } })"
                            />
                        </template>
                    </aui-popup-menu>
                </q-btn>
                <q-space />
                <slot
                    name="toolbar-right"
                />
                <aui-more-menu>
                    <aui-popup-menu-item
                        :label="$t('Refresh')"
                        icon="refresh"
                        @click="reloadContextInternal"
                    />
                    <aui-popup-menu-item
                        :label="(fullscreen)? $t('Exit Fullscreen'):$t('Fullscreen')"
                        :icon="(fullscreen)? 'fullscreen_exit':'fullscreen'"
                        @click="toggleFullscreen"
                    />
                </aui-more-menu>
            </q-toolbar>
            <q-linear-progress
                v-if="$wait.is(WAIT_CONTEXT_AWARE_PAGE)"
                indeterminate
                size="2px"
            />
        </q-page-sticky>
    </q-page>
</template>

<script>
import _ from 'lodash'
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'
import AuiMoreMenu from 'components/AuiMoreMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import {
    WAIT_CONTEXT_AWARE_PAGE
} from 'src/constants'
import AuiPopupMenu from 'components/AuiPopupMenu'

export default {
    name: 'AuiContextAwarePage',
    components: {
        AuiPopupMenu,
        AuiPopupMenuItem,
        AuiMoreMenu

    },
    props: {
        resource: {
            type: String,
            required: true
        },
        resourceId: {
            type: [String, Number],
            required: true
        },
        resourceRelations: {
            type: Object,
            default: null
        },
        breadcrumbRootItem: {
            type: Object,
            required: true
        },
        breadcrumbMenuItems: {
            type: Array,
            required: true
        },
        contextName: {
            type: Function,
            required: true
        },
        contextRoute: {
            type: [Object, String],
            required: true
        }
    },
    data () {
        return {
            pageKey: Math.random(),
            selectedSubContext: null
        }
    },
    computed: {
        ...mapState('layout', [
            'fullscreen'
        ]),
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        contextTo () {
            if (_.isString(this.contextRoute)) {
                return { name: this.contextRoute }
            } else if (_.isObject(this.contextRoute)) {
                return this.contextRoute
            } else {
                return null
            }
        },
        WAIT_CONTEXT_AWARE_PAGE () {
            return WAIT_CONTEXT_AWARE_PAGE
        }
    },
    watch: {
        $route (to, from) {
            this.detectSubContext(to)
        }
    },
    async mounted () {
        await this.loadContext({
            resource: this.resource,
            resourceId: this.resourceId,
            resourceRelations: this.resourceRelations
        })
        this.detectSubContext(this.$route)
    },
    methods: {
        ...mapMutations('layout', [
            'toggleFullscreen'
        ]),
        ...mapActions('page', [
            'loadContext',
            'reloadContext'
        ]),
        reloadContextInternal () {
            this.pageKey = Math.random()
            this.reloadContext()
        },
        detectSubContext (to) {
            if (to.name) {
                this.selectedSubContext = this.breadcrumbMenuItems.find((item) => item.route === to.name)
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.aui-context-aware-page
    padding-top: ($toolbar-min-height + $flex-gutter-sm)
</style>
