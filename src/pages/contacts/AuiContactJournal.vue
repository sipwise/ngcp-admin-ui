<template>
    <aui-journal-sub-context
        :resource="$route.query.resource"
    />
</template>
<script>
import AuiJournalSubContext from 'pages/AuiJournalSubContext'
export default {
    components: { AuiJournalSubContext }
}
</script>
