<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-subscriber-profile
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>
<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewSubscriberProfile from 'components/edit-forms/AuiNewSubscriberProfile'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    components: { AuiNewSubscriberProfile, AuiBaseAddPage },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfileSet: WAIT_PAGE
        }),
        async triggerCreation (data) {
            await this.createProfileSet(data)
            this.$goBack()
            showGlobalSuccessMessage(this.$t('Profile created successfully'))
        }
    }
}
</script>
