<template>
    <aui-data-context
        v-if="subscriberHeaderRulesContext"
        resource-object-id="subscriberHeaderRulesConditionsContext"
        :resource="resourceUrl"
    />
</template>
<script>
import headerRuleConditionsContextMixin from 'src/mixins/data-context-pages/header-rule-conditions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleConditionsContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    computed: {
        resourceUrl () {
            return `v2/header-manipulations/sets/${this.subscriberHeaderRulesContext?.set_id}/rules/${this.subscriberHeaderRulesContext?.id}/conditions/${this.subscriberHeaderRulesConditionsContextId}`
        }
    }
}
</script>
