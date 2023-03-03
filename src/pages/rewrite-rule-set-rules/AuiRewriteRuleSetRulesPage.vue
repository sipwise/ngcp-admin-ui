<template>
    <aui-details-page
        v-bind="$attrs"
        :menu-items-modifier="menuItemsModifier"
        :resource-object="rewriteRuleSetContext"
        v-on="$listeners"
    />
</template>

<script>
import AuiDetailsPage from 'pages/AuiDetailsPage'
import rewriteRuleSetContextMixin from 'src/mixins/data-context-pages/rewrite-rule-set'
export default {
    name: 'AuiRewriteRuleSetRulesPage',
    components: { AuiDetailsPage },
    mixins: [
        rewriteRuleSetContextMixin
    ],
    methods: {
        menuItemsModifier ({ item }) {
            return item
        }
    }
}
</script>
