<template>
    <aui-data-context
        v-if="headerRuleContext"
        resource-object-id="headerRuleActionContext"
        :resource="`v2/header-manipulations/sets/${headerSetContextResourceId}/rules/${headerRuleContextResourceId}/actions`"
        :resource-id="headerRuleActionContextResourceId"
        :resource-expand="headerRuleActionContextExpand"
    />
</template>
<script>
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleActionsContextMixin,
        headerRuleSetContextMixin
    ]
}
</script>
