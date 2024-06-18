<template>
    <aui-data-context
        resource-object-id="subscriberHeaderRulesContext"
        resource="headerrules"
        :resource-id="subscriberHeaderRulesContextResourceId"
    />
</template>
<script>
import subscriberHeaderRulesContextMixin from 'src/mixins/data-context-pages/subscriber-details-headerrules'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [subscriberHeaderRulesContextMixin]
}
</script>
