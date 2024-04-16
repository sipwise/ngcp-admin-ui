<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-pbx-group
                v-if="customerContext"
                :initial-form-data="initialFormData"
                :customer-id="customerContext.id"
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
            </aui-new-pbx-group>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewPbxGroup from 'components/edit-forms/AuiNewPbxGroup'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import PasswordGenerator from 'generate-password'
export default {
    name: 'AuiCustomerDetailsPbxGroupsCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewPbxGroup
    },
    mixins: [
        customerContextMixin
    ],
    async mounted () {
        await this.fetchCustomerContextSubscribers()
    },
    methods: {
        ...mapWaitingActions('customers', {
            createSubscriber: WAIT_PAGE,
            fetchCustomerSubscribers: WAIT_PAGE,
            assignNumbersToSubscriber: WAIT_PAGE
        }),
        async create (data, { seatAliasNumbers }) {
            const pbxPilot = this.customerContextSubscribers?.items?.find((subscriber) => subscriber.is_pbx_pilot)
            data.is_pbx_group = true
            data.customer_id = this.customerContext.id
            data.domain_id = pbxPilot.domain_id
            const username = data.display_name.trim().replaceAll(' ', '-')
            data.username = username.replace(/[^a-zA-Z0-9\-_ ]/g, '')
            data.password = PasswordGenerator.generate({
                length: 10,
                numbers: true,
                lowercase: true,
                uppercase: true,
                symbols: false,
                excludeSimilarCharacters: false,
                exclude: '',
                strict: true
            })
            const subscriberId = await this.createSubscriber(data)
            if (seatAliasNumbers && seatAliasNumbers.length > 0) {
                await this.assignNumbersToSubscriber({
                    subscriberId,
                    numberIds: seatAliasNumbers
                })
            }
            showGlobalSuccessMessage(this.$t('Successfully created group'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
