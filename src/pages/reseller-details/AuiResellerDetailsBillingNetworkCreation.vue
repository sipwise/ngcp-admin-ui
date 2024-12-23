<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-network
                :initial-form-data="props.initialFormData"
                :reseller-id="Number(id)"
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
            </aui-new-billing-network>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewBillingNetwork from 'components/edit-forms/AuiNewBillingNetwork'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
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
            showGlobalSuccessMessage(this.$t('Billing network created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
