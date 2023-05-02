<template>
    <aui-base-sub-context>
        <aui-new-subscriber-profile-set
            v-if="profileSet"
            :initial-form-data="profileSet"
            :reseller="profileSet.reseller_id_expand"
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
        </aui-new-subscriber-profile-set>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewSubscriberProfileSet from 'components/edit-forms/AuiNewSubscriberProfileSet'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    name: 'AuiSubscriberProfileEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberProfileSet
    },
    mixins: [dataContextPageMixin],
    computed: {
        profileSet () {
            return this.getDataContextObject('subscriberProfileSetContext')
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            updateProfileSet: WAIT_PAGE
        }),
        async update (data) {
            await this.updateProfileSet({
                id: this.profileSet.id,
                payload: data
            })
            await this.reloadDataContext('subscriberProfileSetContext')
            showGlobalSuccessMessage(this.$t('Subscriber Profile Set saved successfully'))
        }
    }
}
</script>
