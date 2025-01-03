<template>
    <aui-data-context
        v-if="rewriteRuleSetContext"
        resource-object-id="rewriteRulesContext"
        :resource="`v2/rewrite-rules/sets/${rewriteRuleSetContext.id}/rules`"
        :resource-id="rewriteRuleContextId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
import rewriteRuleSetRulesContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set-rules'
export default {
    components: { AuiDataContext },
    mixins: [
        rewriteRuleSetRulesContextMixin,
        rewriteRuleSetContextMixin
    ]
}
</script>
