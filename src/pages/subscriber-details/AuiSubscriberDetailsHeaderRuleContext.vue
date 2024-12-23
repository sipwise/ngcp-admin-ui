<template>
    <aui-data-context
        resource-object-id="subscriberHeaderRuleContext"
        resource="v2/header-manipulations/sets/rules"
        :resource-id="headerRuleContextResourceId"
        :resource-filters="{
            subscriber_id: $route.params.id
        }"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
    components: { AuiDataContext },
    mixins: [subscriberHeaderRulesContextMixin]
}
</script>
