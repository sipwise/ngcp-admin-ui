<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-billing-network
                :initial-form-data="props.initialFormData"
                :reseller-id="null"
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
    </aui-base-add-page>
</template>

<script>
import AuiNewBillingNetwork from 'components/edit-forms/AuiNewBillingNetwork'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
export default {
    name: 'AuiBillingNetworkCreation',
    components: {
        AuiBaseAddPage,
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
