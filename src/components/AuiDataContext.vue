<template>
    <router-view />
</template>

<script>
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { mapMutations } from 'vuex'

export default {
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
        resourceFilters: {
            type: Array,
            default: undefined
        }
    },
    mounted () {
        this.loadDataContext({
            resource: this.resource,
            resourceId: this.resourceId,
            resourceExpand: this.resourceExpand,
            resourceObjectId: this.resourceObjectId,
            resourceFilters: this.resourceFilters
        })
    },
    destroyed () {
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
        ])
    }
}
</script>
