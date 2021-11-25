<template>
    <aui-context-aware-page
        resource="subscriberprofiles"
        :resource-relations="resourceRelations"
        default-sub-context-route="subscriberProfilesEdit"
        :context-name="({ resourceObject }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.name)
            } else {
                return '...'
            }
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    name: 'AuiSubscriberProfilesContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        resourceRelations () {
            return {
                profile_set_id: {
                    name: 'subscriberprofileset',
                    resource: 'subscriberprofilesets',
                    required: false
                }
            }
        }
    }
}
</script>
