<template>
    <aui-base-sub-context>
        <template
            #default="{ resourceObject, resourceRelatedObjects, resourceRelatedSubObjects }"
        >
            <slot
                name="default"
                :initial-form-data="initialFormData"
                :resource-object="resourceObject"
                :resource-related-object="resourceRelatedObjects"
                :resource-related-sub-objects="resourceRelatedSubObjects"
            />
        </template>
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
