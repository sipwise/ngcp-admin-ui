<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            :resource-object-id="rewriteRuleSetContextId"
            :resource="rewriteRuleSetContextResource"
            :resource-id="rewriteRuleSetContextResourceId"
            :resource-expand="rewriteRuleSetExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
export default {
    name: 'AuiRewriteRuleSetsContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        rewriteRuleSetContextMixin
    ],
    methods: {
        async refresh () {
            await this.reloadRewriteRuleSetContext()
        }
    }
}
</script>
