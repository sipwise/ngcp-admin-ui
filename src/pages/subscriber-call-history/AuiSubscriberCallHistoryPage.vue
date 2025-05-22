<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="subscriberContext"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberCallHistoryPage',
    components: { AuiDetailsPage },
    mixins: [
        subscriberContextMixin
    ]
}
</script>
