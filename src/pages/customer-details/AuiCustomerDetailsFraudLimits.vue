<template>
    <aui-base-edit-context>
        <aui-customer-fraud-limits-form
            v-if="resourceObject && fraudLimits"
            :initial-form-data="fraudLimits"
            :customer-id="customerId"
            :loading="$waitPage()"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    :close-button="false"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-customer-fraud-limits-form>
    </aui-base-edit-context>
</template>

<script>
import {
    mapState
} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import subContext from 'src/mixins/sub-context'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiCustomerFraudLimitsForm from 'components/edit-forms/AuiCustomerFraudLimitsForm'

export default {
    name: 'AuiCustomerDetailsFraudLimits',
    components: {
        AuiCustomerFraudLimitsForm,
        AuiFormActionsUpdate,
        AuiBaseEditContext
    },
    mixins: [
        subContext
    ],
    computed: {
        ...mapState('customers', [
            'fraudLimits'
        ]),
        customerId () {
            return this.resourceObject?.id
        }
    },
    watch: {
        async customerId () {
            await this.reload()
        }
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('customers', {
            loadFraudPreferences: WAIT_PAGE,
            updateFraudPreferences: WAIT_PAGE
        }),
        async reload () {
            if (this.customerId) {
                await this.loadFraudPreferences(this.customerId)
            }
        },
        async update (data) {
            data.id = this.customerId
            await this.updateFraudPreferences({
                ...data
            })
            await this.reload()
            showGlobalSuccessMessage(this.$t('Fraud Preferences updated successfully'))
        }
    }
}
</script>
