<template>
    <aui-base-add-page>
        <aui-new-subscriber-profile
            :loading="$waitPage()"
        >
            <template
                #actions="{ loading, hasInvalidData, submit }"
            >
                <aui-form-actions-creation
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    @submit="submit"
                />
            </template>
        </aui-new-subscriber-profile>
    </aui-base-add-page>
</template>
<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewSubscriberProfile from 'components/edit-forms/AuiNewSubscriberProfileSet'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiSubscriberProfileSetCreation',
    components: { AuiFormActionsCreation, AuiNewSubscriberProfile, AuiBaseAddPage },
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
