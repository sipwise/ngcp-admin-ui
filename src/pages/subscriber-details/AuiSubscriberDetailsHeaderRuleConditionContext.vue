<template>
    <aui-data-context
        v-if="subscriberHeaderRuleContext"
        resource-object-id="subscriberHeaderRuleConditionContext"
        :resource="resourceUrl"
        :resource-id="subscriberHeaderRuleConditionContextId"
        :resource-filters="{
            subscriber_id: $route.params.id
        }"
        :resource-expand="headerRuleConditionContextExpand"
    />
</template>
<script>
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleConditionsContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    computed: {
        resourceUrl () {
            return `v2/header-manipulations/sets/${this.subscriberHeaderRuleContext.set_id}/rules/${this.subscriberHeaderRuleContext.id}/conditions`
        }
    }
}
</script>
