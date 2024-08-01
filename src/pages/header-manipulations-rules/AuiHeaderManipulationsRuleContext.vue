<template>
    <aui-data-context
        v-if="headerSetContext"
        resource-object-id="headerRuleContext"
        :resource="`v2/header-manipulations/sets/${headerSetContextResourceId}/rules`"
        :resource-id="headerRuleContextResourceId"
    />
</template>
<script>
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext },
    mixins: [headerRuleSetContextMixin]
}
</script>
