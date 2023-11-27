<template>
    <aui-data-context
        resource-object-id="headerRuleConditionContext"
        resource="headerruleconditions"
        :resource-id="headerRulesConditionsContextResourceId"
        :resource-expand="headerRuleConditionsContextExpand"
    />
</template>
<script>
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [headerRuleConditionsContextMixin]
}
</script>
