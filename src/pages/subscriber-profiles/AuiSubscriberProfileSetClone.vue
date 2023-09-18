<template>
    <aui-base-sub-context>
        <aui-new-subscriber-profile-set
            v-if="subscriberProfileSet"
            :initial-form-data="subscriberProfileSet"
            :reseller="subscriberProfileSet.reseller_id_expand"
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
    name: 'AuiSubscriberProfileSetClone',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewSubscriberProfileSet
    },
    mixins: [dataContextPageMixin],
    data () {
        return {
            subscriberProfileSet: null
        }
    },
    computed: {
        subscriberProfileSetContext () {
            return this.getDataContextObject('subscriberProfileSetContext')
        }
    },
    watch: {
        subscriberProfileSetContext () {
            if (this.subscriberProfileSetContext) {
                this.getSubscriberProfileSet()
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscriberProfiles', {
            createSubscriberProfileSet: WAIT_PAGE,
            getSubscriberProfile: WAIT_PAGE
        }),
        async getSubscriberProfileSet () {
            const subscriberProfile = await this.getSubscriberProfile({ set_id: this.subscriberProfileSetContext.id })
            this.subscriberProfileSet = {
                ...this.subscriberProfileSetContext,
                // eslint-disable-next-line camelcase
                subscriberprofile: subscriberProfile.data.items.map(({ id, set_id, ...allFields }) => {
                    return allFields
                })
            }
        },
        async clone (data) {
            await this.createSubscriberProfileSet(data)
            showGlobalSuccessMessage(this.$t('Subscriber Profile Set cloned successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
