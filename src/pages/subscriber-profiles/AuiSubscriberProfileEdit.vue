<template>
    <aui-base-sub-context>
        <aui-new-subscriber-profiles
            v-if="subscriberProfileSetContext && subscriberProfileContext"
            :initial-form-data="subscriberProfileContext"
            :loading="$waitPage($wait)"
            :profile_set_id="subscriberProfileSetContext.id"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-subscriber-profiles>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewSubscriberProfiles from 'components/edit-forms/AuiNewSubscriberProfiles'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberProfileSetContextMixin from 'src/mixins/data-context-pages/subscriber-profile-set'
import subscriberProfileContextMixin from 'src/mixins/data-context-pages/subscriber-profile'
export default {
    name: 'AuiSubscriberProfileEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberProfiles
    },
    mixins: [
        subscriberProfileSetContextMixin,
        subscriberProfileContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            updateProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateProfile({
                id: this.subscriberProfileContext.id,
                payload: data
            })
            await this.reloadDataContext('subscriberProfileContext')
            showGlobalSuccessMessage(this.$t('Profile saved successfully'))
        }
    }
}
</script>
