<template>
    <aui-base-page
        ref="basePage"
        :key="pageKey"
        :breadcrumb-item-intercept="({ route, item, index }) => {
            if (route.meta.contextRoot) {
                item.label = contextName({
                    resourceObject: resourceObject,
                    resourceRelatedObjects: resourceRelatedObjects,
                    resourceRelatedSubObjects: resourceRelatedSubObjects
                })
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
        v-on="$listeners"
        @refresh="reloadContextInternal"
    >
        <slot />
    </aui-base-page>
</template>

<script>
import {
    mapActions,
    mapMutations,
    mapState
} from 'vuex'
import {
    WAIT_PAGE, WAIT_SUB_CONTEXT
} from 'src/constants'
import AuiBasePage from 'pages/AuiBasePage'

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
            return String(this.$route.params.id)
        }
    },
    watch: {
        $route () {
            this.contextRedirect()
        },
        pageLoading () {
            this.$emit('loading')
        },
        async resourceId () {
            await this.load()
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
            if (this.resource) {
                await this.loadContext({
                    resource: this.resource,
                    resourceId: this.resourceId,
                    resourceRelations: this.resourceRelations
                })
                this.contextRedirect()
            }
        },
        contextRedirect () {
            if (this.$route?.meta?.contextRoot) {
                this.$router.replace({
                    name: this.defaultSubContextRoute,
                    params: { id: this.$route.params.id }
                })
            }
        }
    }
}
</script>
