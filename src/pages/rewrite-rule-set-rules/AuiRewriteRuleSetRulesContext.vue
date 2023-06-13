<template>
    <aui-data-context
        resource-object-id="rewriteRuleSetRulesContext"
        resource="rewriterules"
        :resource-id="rewriteRuleSetRulesContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import rewriteRuleSetRulesContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set-rules'
export default {
    components: { AuiDataContext },
    mixins: [
        rewriteRuleSetRulesContextMixin
    ]
}
</script>
