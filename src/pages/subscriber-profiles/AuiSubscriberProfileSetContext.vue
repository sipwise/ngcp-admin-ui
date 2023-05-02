<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="subscriberProfileSetContext"
            resource="subscriberprofilesets"
            :resource-id="id"
            :resource-expand="[
                'reseller_id'
            ]"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiSubscriberProfileSetContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
