<template>
    <aui-data-context
        v-if="subscriberContext"
        :resource-object-id="resourceObjectId"
        resource="calls"
        :resource-id="$route.params.rowId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import { WAIT_PAGE } from 'src/constants'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    components: { AuiDataContext },
    mixins: [
        subscriberContextMixin
    ],
    props: {
        resourceObjectId: {
            type: String,
            required: true
        }
    },
    async mounted () {
        await this.load()
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadCallDetails: WAIT_PAGE
        }),
        async load () {
            return await this.loadCallDetails({ callId: this.$route.params.rowId, subscriberId: this.subscriberContextResourceId })
        }
    }
}
</script>
