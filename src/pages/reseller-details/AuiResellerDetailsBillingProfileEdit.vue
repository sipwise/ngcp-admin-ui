<template>
    <aui-base-edit-context>
        <aui-new-billing-profile
            v-if="resourceObject"
            :initial-form-data="initialData"
            :reseller-id="Number(id)"
            :loading="$waitPage()"
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
        </aui-new-billing-profile>
    </aui-base-edit-context>
</template>

<script>
import AuiNewBillingProfile from 'components/edit-forms/AuiNewBillingProfile'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiResellerDeatilsBillingProfileEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewBillingProfile
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
            updateBillingProfile: WAIT_PAGE,
            loadBillingProfile: WAIT_PAGE
        }),
        async reload () {
            const billingProfile = await this.loadBillingProfile(this.$route.params.billingProfileId)
            this.initialData = billingProfile.data
        },
        async update (data) {
            await this.updateBillingProfile({
                id: this.$route.params.billingProfileId,
                payload: data
            })
            await this.reload()
            showGlobalSuccessMessage(this.$t('Billing profile successfully updated'))
        }
    }
}
</script>
