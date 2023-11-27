<template>
    <aui-data-context
        resource-object-id="headerRuleActionContext"
        resource="headerruleactions"
        :resource-id="headerRulesActionsContextResourceId"
        :resource-expand="headerRuleActionsContextExpand"
    />
</template>
<script>
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [headerRuleActionsContextMixin]
}
</script>
