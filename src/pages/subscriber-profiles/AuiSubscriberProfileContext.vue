<template>
    <aui-data-context
        resource-object-id="subscriberProfileContext"
        resource="subscriberprofiles"
        :resource-id="subscriberProfileContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import subscriberProfileContextMixin from 'src/mixins/data-context-pages/subscriber-profile'
export default {
    components: { AuiDataContext },
    mixins: [
        subscriberProfileContextMixin
    ]
}
</script>
