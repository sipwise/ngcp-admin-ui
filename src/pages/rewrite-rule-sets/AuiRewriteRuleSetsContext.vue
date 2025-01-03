<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            resource-object-id="rewriteRuleSetContext"
            :resource="`v2/rewrite-rules/sets`"
            :resource-id="id"
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
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    methods: {
        async refresh () {
            await this.reloadRewriteRuleSetContext()
        }
    }
}
</script>
