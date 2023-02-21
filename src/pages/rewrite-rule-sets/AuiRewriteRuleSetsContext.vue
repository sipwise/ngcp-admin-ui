<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="rewriteRuleSetContext"
            resource="rewriterulesets"
            :resource-id="rewriteRuleSetId"
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
    name: 'AuiRewriteRuleSetsContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    props: {
        rewriteRuleSetId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
