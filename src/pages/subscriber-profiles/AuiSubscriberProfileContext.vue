<template>
    <aui-data-context
        resource-object-id="subscriberProfileContext"
        resource="subscriberprofiles"
        :resource-id="id"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
