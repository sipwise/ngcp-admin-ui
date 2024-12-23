<template>
    <aui-base-list-page>
        <aui-journal
            :resource="resource"
            :resource-id="resourceId"
            :use-v2="useV2"
        />
    </aui-base-list-page>
</template>
<script>
import AuiBaseListPage from 'pages/AuiBaseListPage'
import AuiJournal from 'pages/AuiJournal'
import dataTableColumn from 'src/mixins/data-table-column'
import subContext from 'src/mixins/sub-context'
export default {
    components: {
        AuiBaseListPage,
        AuiJournal
    },
    mixins: [
        dataTableColumn,
        subContext
    ],
    props: {
        resource: {
            type: String,
            required: true
        },
        resourceId: {
            type: [String, Number],
            default: undefined
        },
        useV2: {
            type: Boolean,
            default: false
        }
    }
}
</script>
