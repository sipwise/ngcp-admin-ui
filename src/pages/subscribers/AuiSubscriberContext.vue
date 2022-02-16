<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            :resource-object-id="subscriberContextId"
            :resource="subscriberContextResource"
            :resource-id="subscriberContextResourceId"
            :resource-expand="subscriberContextExpand"
        />
    </aui-base-page>
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        subscriberContextMixin
    ],
    methods: {
        async refresh () {
            await this.reloadSubscriberContext()
        }
    }
}
</script>
