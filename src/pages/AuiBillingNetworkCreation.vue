<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-network
                :initial-form-data="props.initialFormData"
                :reseller-id="Number(id)"
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
            </aui-new-billing-network>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewBillingNetwork from 'components/edit-forms/AuiNewBillingNetwork'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiBillingNetworkCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewBillingNetwork
    },
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    },
    methods: {
        ...mapWaitingActions('billing', {
            createBillingNetwork: WAIT_PAGE
        }),
        async create (data) {
            await this.createBillingNetwork(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Billing network created successfully'))
        }
    }
}
</script>
