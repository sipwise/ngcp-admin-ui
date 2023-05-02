<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="resourceObject"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiResellerDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        subContext
    ]
}
</script>
