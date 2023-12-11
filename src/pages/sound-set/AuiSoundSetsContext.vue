<template>
    <aui-base-page>
        <aui-data-context
            :resource-object-id="soundSetsContextId"
            :resource="soundSetsContextResource"
            :resource-id="soundSetsContextResourceId"
            :resource-expand="billingProfileContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
export default {
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        soundSetsContextMixin
    ]
}
</script>
