<template>
    <aui-context-aware-page
        :resource-relations="resourceRelations"
        default-sub-context-route="timeSetEdit"
        :context-name="({ resourceObject }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.name)
            } else {
                return '...'
            }
        }"
        :loading="loading"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
import { WAIT_PAGE, WAIT_PREFERENCES } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import { mapActions } from 'vuex'
export default {
    name: 'AuiTimeSetContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        resourceRelations () {
            return {
                reseller_id: {
                    name: 'reseller',
                    resource: 'resellers',
                    required: false
                }
            }
        },
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
        ...mapWaitingActions('timeSets', {
            loadTimeSet: WAIT_PAGE
        }),
        async set () {
            const timeSet = await this.loadTimeSet({ id: parseInt(this.$route.params.id, 10) })
            await this.setContext({
                resourceObject: timeSet
            })
        }
    }
}
</script>
