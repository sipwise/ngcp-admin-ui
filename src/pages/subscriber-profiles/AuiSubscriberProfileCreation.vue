<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-profiles
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSubscriberProfiles from 'components/edit-forms/AuiNewSubscriberProfiles'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberProfilesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewSubscriberProfiles
    },
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfile: WAIT_PAGE
        }),
        async create (data) {
            data.profile_set_id = this.id
            await this.createProfile(data)
            showGlobalSuccessMessage(this.$t('Profile created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
