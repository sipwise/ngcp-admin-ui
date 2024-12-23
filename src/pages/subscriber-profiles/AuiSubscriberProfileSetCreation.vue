<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-subscriber-profile-set
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
            </aui-new-subscriber-profile-set>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSubscriberProfileSet from 'components/edit-forms/AuiNewSubscriberProfileSet'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberProfileSetCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewSubscriberProfileSet,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createProfileSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createProfileSet(data)
            showGlobalSuccessMessage(this.$t('Subscriber Profile Set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
