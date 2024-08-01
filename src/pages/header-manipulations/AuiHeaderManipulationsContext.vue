<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            resource-object-id="headerSetContext"
            resource="v2/header-manipulations/sets"
            :resource-id="id"
            :resource-expand="headerSetContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
export default {
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
            await this.reloadHeaderSetContext()
        }
    }
}
</script>
