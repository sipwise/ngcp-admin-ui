<template>
    <aui-base-sub-context>
        <aui-new-subscriber-profiles
            v-if="profile"
            :initial-form-data="profile"
            :loading="$waitPage($wait)"
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
import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    name: 'AuiSubscriberProfileEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberProfiles
    },
    mixins: [dataContextPageMixin],
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    computed: {
        profile () {
            return this.getDataContextObject('subscriberProfileContext')
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            updateProfile: WAIT_PAGE
        }),
        async update (data) {
            await this.updateProfile({
                id: this.id,
                payload: data
            })
            await this.reloadDataContext('subscriberProfileContext')
            showGlobalSuccessMessage(this.$t('Profile saved successfully'))
        }
    }
}
</script>
