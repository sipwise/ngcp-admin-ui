<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="subscriberContext"
        :disable-sort="true"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwarding',
    components: { AuiDetailsPage },
    mixins: [
        subscriberContextMixin
    ]
}
</script>
