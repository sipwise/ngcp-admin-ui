<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="adminContext"
            resource="admins"
            :resource-id="$route.params.id"
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
    name: 'AuiAdminContext',
    components: {
        AuiBasePage,
        AuiDataContext
    }
}
</script>
