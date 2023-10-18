<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="billingProfilePackageContext"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
export default {
    name: 'AuiProfilePackagesDetailsPage',
    components: { AuiDetailsPage },
    mixins: [
        billingProfilePackageContextMixin
    ]
}
</script>
