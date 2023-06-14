<template>
    <aui-data-context
        resource-object-id="rewriteRulesContext"
        resource="rewriterules"
        :resource-id="rewriteRuleContextId"
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
