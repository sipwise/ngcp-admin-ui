<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-subscriber-profiles
                :initial-form-data="props.initialFormData"
                :profile-set-id="profileSetId"
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
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewSubscriberProfiles from 'components/edit-forms/AuiNewSubscriberProfiles'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiSubscriberProfilesCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewSubscriberProfiles,
        AuiBaseAddPage
    },
    props: {
        profileSetId: {
            type: Number,
            default: null
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfile: WAIT_PAGE
        }),
        async create (data) {
            await this.createProfile(data)
            this.$goBack()
            showGlobalSuccessMessage(this.$t('Profile created successfully'))
        }
    }
}
</script>
