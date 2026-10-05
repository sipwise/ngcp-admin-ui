<template>
    <router-view :key="resourceId" />
</template>

<script>
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import { mapMutations } from 'vuex'

export default {
    name: 'AuiDataContext',
    props: {
        resource: {
            type: String,
            required: true
        },
        resourceId: {
            type: [Number, String],
            required: true
        },
        resourceObjectId: {
            type: String,
            required: true
        },
        resourceExpand: {
            type: Array,
            default: undefined
        },
        resourceRelations: {
            type: Object,
            default: undefined
        },
        resourceFilters: {
            type: Object,
            default: undefined
        }
    },
    watch: {
        async resourceId () {
            this.destroyDataContext({ resourceObjectId: this.resourceObjectId })
            await this.load()
        }
    },
    async mounted () {
        await this.load()
    },
    unmounted () {
        this.destroyDataContext({
            resourceObjectId: this.resourceObjectId
        })
    },
    methods: {
        ...mapWaitingActions('page', {
            loadDataContext: WAIT_PAGE
        }),
        ...mapMutations('page', [
            'destroyDataContext'
        ]),
        async load () {
            await this.loadDataContext({
                resource: this.resource,
                resourceId: this.resourceId,
                resourceExpand: this.resourceExpand,
                resourceRelations: this.resourceRelations,
                resourceObjectId: this.resourceObjectId,
                resourceFilters: this.resourceFilters
            })
        }
    }
}
</script>
