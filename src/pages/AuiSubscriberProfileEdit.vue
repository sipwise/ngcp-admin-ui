<template>
    <aui-base-edit-context
        @form-input="triggerUpdate"
    >
        <aui-new-subscriber-profile
            v-if="resourceObject"
            ref="form"
            :profile="resourceObject"
            :reseller="resourceRelatedObjects.reseller"
            :loading="$waitPage()"
        />
    </aui-base-edit-context>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewSubscriberProfile from 'components/edit-forms/AuiNewSubscriberProfile'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberProfileEdit',
    components: {
        AuiBaseEditContext,
        AuiNewSubscriberProfile
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            updateProfileSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            await this.updateProfileSet({
                id: this.resourceObject.id,
                payload: data
            })
            await this.reloadContext()
            showGlobalSuccessMessage(this.$t('Profile saved successfully'))
        }
    }
}
</script>
