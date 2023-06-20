<template>
    <aui-context-aware-page
        default-sub-context-route="callListSuppressionEdit"
        :context-name="({ resourceObject }) => {
            return '#' + resourceObject.id + ' - ' + resourceObject.label
        }"
        :loading="loading"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
import { WAIT_PAGE, WAIT_PREFERENCES } from 'src/constants'
import { mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCallListSuppressionContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        loading () {
            return this.$wait.is(WAIT_PREFERENCES)
        }
    },
    async mounted () {
        await this.set()
    },
    methods: {
        ...mapActions('page', [
            'setContext'
        ]),
        ...mapWaitingActions('callListSuppressions', {
            loadCallListSuppression: WAIT_PAGE
        }),
        async set () {
            const callListSuppression = await this.loadCallListSuppression({ id: parseInt(this.$route.params.id, 10) })
            await this.setContext({
                resourceObject: callListSuppression
            })
        }
    }
}
</script>
