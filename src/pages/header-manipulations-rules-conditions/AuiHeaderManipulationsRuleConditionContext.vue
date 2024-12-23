<template>
    <aui-data-context
        v-if="headerRuleContext"
        resource-object-id="headerRuleConditionContext"
        :resource="`v2/header-manipulations/sets/${headerSetContextResourceId}/rules/${headerRuleContext.id}/conditions`"
        :resource-id="headerRuleConditionContextResourceId"
        :resource-expand="headerRuleConditionContextExpand"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleConditionsContextMixin,
        headerRuleSetContextMixin
    ]
}
</script>
