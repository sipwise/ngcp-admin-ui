<template>
    <aui-base-sub-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-subscriber
                v-if="customerContext && customerContextSubscribers"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :reseller-id="customerContextReseller?.id"
                :customer-id="customerContext.id"
                :is-pbx-account="customerContextIsPbx"
                :is-seat="customerContextIsPbx && customerContextHasPilot"
                :is-pilot="customerContextIsPbx && !customerContextHasPilot"
                layout="8-4"
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
            </aui-new-subscriber>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewSubscriber from 'components/edit-forms/AuiNewSubscriber'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiSubscriberCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewSubscriber
    },
    mixins: [
        customerContextMixin
    ],
    async mounted () {
        await this.fetchCustomerContextSubscribers()
    },
    methods: {
        ...mapWaitingActions('customers', {
            createSubscriber: WAIT_PAGE
        }),
        async create (data, { seatAliasNumbers }) {
            const subscriberId = await this.createSubscriber(data)
            if (seatAliasNumbers && seatAliasNumbers.length > 0) {
                await this.assignNumbersToSubscriber({
                    subscriberId,
                    numberIds: seatAliasNumbers
                })
            }
            showGlobalSuccessMessage(this.$t('Subscriber created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
