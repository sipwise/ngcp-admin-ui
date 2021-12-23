<template>
    <aui-base-sub-context>
        <slot
            :initial-form-data="initialFormData"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import creationSession from 'src/mixins/creation-session'
export default {
    name: 'AuiBaseAddContext',
    components: {
        AuiBaseSubContext
    },
    mixins: [creationSession]
}
</script>
