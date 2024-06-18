<template>
    <aui-data-context
        resource-object-id="subscriberHeaderRulesActionsContext"
        :resource="resourceUrl"
    />
</template>
<script>
import headerRuleActionsContextMixin from 'src/mixins/data-context-pages/header-rule-actions'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [
        headerRuleActionsContextMixin,
        subscriberHeaderRulesContextMixin
    ],
    computed: {
        resourceUrl () {
            return `v2/header-manipulations/sets/${this.subscriberHeaderRulesContext?.set_id}/rules/${this.subscriberHeaderRulesContext?.id}/actions/${this.headerRulesActionsContextResourceId}`
        }
    }
}
</script>
