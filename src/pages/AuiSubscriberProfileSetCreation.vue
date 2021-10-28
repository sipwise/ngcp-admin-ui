<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-subscriber-profile
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
            </aui-new-subscriber-profile>
        </template>
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
    components: {
        AuiFormActionsCreation,
        AuiNewSubscriberProfile,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfileSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createProfileSet(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Profile created successfully'))
        }
    }
}
</script>
