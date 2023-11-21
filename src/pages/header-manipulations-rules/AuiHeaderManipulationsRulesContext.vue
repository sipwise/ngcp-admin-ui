<template>
    <aui-data-context
        resource-object-id="headerRuleSetRulesContext"
        resource="headerrules"
        :resource-id="headerRulesContextResourceId"
    />
</template>
<script>
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [headerRuleSetContextMixin]
}
</script>
