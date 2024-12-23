<template>
    <aui-base-edit-context>
        <aui-new-billing-network
            v-if="resourceObject"
            :initial-form-data="initialData"
            :reseller-id="Number(id)"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-billing-network>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewBillingNetwork from 'components/edit-forms/AuiNewBillingNetwork'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiBillingNetworkEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewBillingNetwork
    },
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    },
    data () {
        return {
            initialData: null
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingNetwork: WAIT_PAGE,
            loadBillingNetwork: WAIT_PAGE
        }),
        async reload () {
            const billingNetwork = await this.loadBillingNetwork(this.$route.params.billingNetworkId)
            this.initialData = billingNetwork.data
        },
        async update (data) {
            await this.updateBillingNetwork({
                id: this.$route.params.billingNetworkId,
                payload: data
            })
            await this.reload()
            showGlobalSuccessMessage(this.$t('Billing network successfully updated'))
        }
    }
}
</script>
