<template>
    <aui-data-context
        v-if="headerSetContext"
        resource-object-id="headerRuleContext"
        :resource="`v2/header-manipulations/sets/${headerSetContextResourceId}/rules`"
        :resource-id="headerRuleContextResourceId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
    components: { AuiDataContext },
    mixins: [headerRuleSetContextMixin]
}
</script>
