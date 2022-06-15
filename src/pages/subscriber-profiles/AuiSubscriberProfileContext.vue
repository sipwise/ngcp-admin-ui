<template>
    <aui-data-context
        resource-object-id="subscriberProfileContext"
        resource="subscriberprofiles"
        :resource-id="profileId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    props: {
        profileId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
