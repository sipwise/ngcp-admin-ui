<template>
    <aui-context-aware-page
        :context-name="()=>$t('Branding')"
    >
        <aui-reseller-details-branding
            :id="id"
        />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
import AuiResellerDetailsBranding from 'pages/AuiResellerDetailsBranding'
export default {
    name: 'AuiBranding',
    components: {
        AuiResellerDetailsBranding,
        AuiContextAwarePage
    },
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    }
}
</script>
