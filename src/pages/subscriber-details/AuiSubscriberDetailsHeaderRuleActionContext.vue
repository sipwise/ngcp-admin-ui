<template>
    <aui-data-context
        v-if="subscriberHeaderRuleContext"
        resource-object-id="subscriberHeaderRuleActionContext"
        :resource="resourceUrl"
        :resource-id="headerRuleActionContextResourceId"
        :resource-filters="{
            subscriber_id: $route.params.id
        }"
    />
</template>
<script>
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleActionsContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    computed: {
        resourceUrl () {
            return `v2/header-manipulations/sets/${this.subscriberHeaderRuleContext.set_id}/rules/${this.subscriberHeaderRuleContext.id}/actions`
        }
    }
}
</script>
