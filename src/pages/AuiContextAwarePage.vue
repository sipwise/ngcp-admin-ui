<template>
    <aui-base-page
        ref="basePage"
        :key="pageKey"
        :breadcrumb-item-intercept="({ route, item, index }) => {
            if (route.meta.contextRoot) {
                if (resourceObject) {
                    item.label = contextName({
                        resourceObject: resourceObject,
                        resourceRelatedObjects: resourceRelatedObjects,
                        resourceRelatedSubObjects: resourceRelatedSubObjects
                    })
                } else {
                    item.label = '...'
                }
                item.menu = false
                if ($route.name === defaultSubContextRoute) {
                    item.to = undefined
                }
            }
            if ($route.name === route.name) {
                item.to = undefined
            }
            return item
        }"
        :loading="pageLoading"
        v-bind="$attrs"
        @refresh="reloadContextInternal"
    >
        <slot />
    </aui-base-page>
</template>

<script>
import AuiBasePage from 'pages/AuiBasePage'
import { WAIT_PAGE, WAIT_SUB_CONTEXT } from 'src/constants'
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'

export default {
    name: 'AuiContextAwarePage',
    components: {
        AuiBasePage
    },
    props: {
        resource: {
            type: String,
            default: null
        },
        resourceExpand: {
            type: Array,
            default: null
        },
        resourceRelations: {
            type: Object,
            default: null
        },
        contextName: {
            type: Function,
            required: true
        },
        defaultSubContextRoute: {
            type: String,
            default: null
        }
    },
    emits: ['loading'],
    data () {
        return {
            pageKey: Math.random()
        }
    },
    computed: {
        pageLoading () {
            return this.$wait.is(WAIT_PAGE) ||
                this.$wait.is(WAIT_SUB_CONTEXT) ||
                this.$attrs.loading
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
        resourceId () {
            if (this.$route.params.id) {
                return String(this.$route.params.id)
            }
            return undefined
        }
    },
    watch: {
        $route () {
            this.contextRedirect()
        },
        pageLoading () {
            this.$emit('loading')
        }
    },
    async mounted () {
        await this.load()
    },
    methods: {
        ...mapMutations('page', [
            'setCurrentSubContext'
        ]),
        ...mapActions('page', [
            'loadContext',
            'reloadContext'
        ]),
        async reloadContextInternal () {
            this.pageKey = Math.random()
            await this.reloadContext()
        },
        async load () {
            if (this.resource && this.resourceId) {
                await this.loadContext({
                    resource: this.resource,
                    resourceId: this.resourceId,
                    resourceExpand: this.resourceExpand,
                    resourceRelations: this.resourceRelations
                })
                this.contextRedirect()
            }
        },
        contextRedirect () {
            if (this.$route?.matched) {
                const routeData = this.$route?.matched.find((route) => route.name === this.$route.name)
                if (routeData?.meta?.contextRoot) {
                    this.$router.replace({
                        name: this.defaultSubContextRoute,
                        params: { id: routeData.params.id }
                    })
                }
            }
        }
    }
}
</script>
