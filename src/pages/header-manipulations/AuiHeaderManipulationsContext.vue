<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            resource-object-id="headerRuleSetContext"
            resource="headerrulesets"
            :resource-id="id"
            :resource-expand="headerRuleSetContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
export default {
    name: 'AuiHeaderManipulationsContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        headerRuleSetContextMixin
    ],
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    methods: {
        async refresh () {
            await this.reloadHeaderRuleSetContext()
        }
    }
}
</script>
