<template>
    <aui-base-page>
        <aui-data-context
            resource-object-id="headerRuleSetRulesContext"
            resource="headerrules"
            :resource-id="headerRulesContextId"
        />
    </aui-base-page>
</template>
<script>
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    components: { AuiBasePage, AuiDataContext },
    mixins: [headerRuleSetContextMixin]
}
</script>
