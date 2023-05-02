<template>
    <aui-details-page
        v-bind="$attrs"
        :resource-object="rewriteRuleSetContext"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
export default {
    name: 'AuiRewriteRuleSetRulesPage',
    components: { AuiDetailsPage },
    mixins: [
        rewriteRuleSetContextMixin
    ]
}
</script>
