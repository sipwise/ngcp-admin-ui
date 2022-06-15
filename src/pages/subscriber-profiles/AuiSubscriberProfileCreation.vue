<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-profiles
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
                @submit="create"
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
            </aui-new-subscriber-profiles>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewSubscriberProfiles from 'components/edit-forms/AuiNewSubscriberProfiles'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiSubscriberProfilesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewSubscriberProfiles
    },
    props: {
        profileSetId: {
            type: [String, Number],
            required: true
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfile: WAIT_PAGE
        }),
        async create (data) {
            data.profile_set_id = this.profileSetId
            await this.createProfile(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Profile created successfully'))
        }
    }
}
</script>
