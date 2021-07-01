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
            return this.$route.params.id
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
        await this.loadContext({
            resource: this.resource,
            resourceId: this.resourceId,
            resourceRelations: this.resourceRelations
        })
        this.contextRedirect()
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
