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
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [subscriberHeaderRulesContextMixin]
}
</script>
