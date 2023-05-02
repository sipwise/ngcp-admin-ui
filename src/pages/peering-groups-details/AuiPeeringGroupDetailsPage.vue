<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="peeringContext"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import peeringGroupContextMixin from 'src/mixins/data-context-pages/peering'
export default {
    name: 'AuiPeeringGroupDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        peeringGroupContextMixin
    ]
}
</script>
