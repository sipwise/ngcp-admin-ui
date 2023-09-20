<template>
    <aui-base-sub-context>
        <aui-new-subscriber-profiles
            v-if="subscriberProfile"
            :initial-form-data="subscriberProfile"
            :loading="$waitPage($wait)"
            :is-clone="true"
            @submit="clone"
        >
            <template
                #actions="{ loading, hasInvalidData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="true"
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
    name: 'AuiSubscriberProfileClone',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberProfiles
    },
    mixins: [dataContextPageMixin],
    data () {
        return {
            subscriberProfile: null
        }
    },
    computed: {
        subscriberProfileContext () {
            return this.getDataContextObject('subscriberProfileContext')
        }
    },
    watch: {
        subscriberProfileContext () {
            if (this.subscriberProfileContext) {
                this.getSubscriberProfile()
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createSubscriberProfile: WAIT_PAGE,
            getSubscriberProfiles: WAIT_PAGE
        }),
        async getSubscriberProfile () {
            const profileSubscriber = await this.getSubscriberProfiles({ profile_set_id: this.subscriberProfileContext.id })
            this.subscriberProfile = {
                ...this.subscriberProfileContext,
                // eslint-disable-next-line camelcase
                subscriberprofile: profileSubscriber.data.items.map(({ id, profile_set_id, ...allFields }) => {
                    return allFields
                })
            }
        },
        async clone (data) {
            await this.createSubscriberProfile(data)
            showGlobalSuccessMessage(this.$t('Subscriber Profile Set cloned successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
