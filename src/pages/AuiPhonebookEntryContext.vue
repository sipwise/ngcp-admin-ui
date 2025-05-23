<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="phonebookEntryContext"
            :resource="`v2/resellers/${$route.params.resellerId}/phonebook/${$route.params.id}`"
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
    name: 'AuiPhonebookEntryContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    props: {
        resellerId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
