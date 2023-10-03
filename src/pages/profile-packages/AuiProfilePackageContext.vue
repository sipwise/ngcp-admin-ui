<template>
    <aui-base-page>
        <aui-data-context
            :resource-object-id="billingProfilePackageContextId"
            resource="profilepackages"
            :resource-id="billingProfilePackageContextResourceId"
            :resource-expand="billingProfilePackageContextExpand"
            :resource-relations="billingProfilePackageContextRelations"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
export default {
    name: 'AuiProfilePackageContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        billingProfilePackageContextMixin
    ]
}
</script>
