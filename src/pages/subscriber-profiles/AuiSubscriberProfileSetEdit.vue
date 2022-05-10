<template>
    <aui-base-edit-context>
        <aui-new-subscriber-profile
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :reseller="resourceRelatedObjects.reseller"
            :loading="$waitPage()"
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
        </aui-new-subscriber-profile>
    </aui-base-edit-context>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewSubscriberProfile from 'components/edit-forms/AuiNewSubscriberProfileSet'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
export default {
    name: 'AuiSubscriberProfileEdit',
    components: {
        AuiFormActionsUpdate,
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
        async update (data) {
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
