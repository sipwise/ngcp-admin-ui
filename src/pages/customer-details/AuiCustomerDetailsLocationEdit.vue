<template>
    <aui-base-edit-context>
        <aui-new-customer-location
            v-if="customerContext && customerLocationContext"
            :initial-form-data="customerLocationContext"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-customer-location>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCustomerLocation from 'components/edit-forms/AuiNewCustomerLocation'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerLocationContextMixin from 'src/mixins/data-context-pages/customer-details-location'
export default {
    name: 'AuiCustomerDetailsLocationEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCustomerLocation
    },
    mixins: [
        customerContextMixin,
        customerLocationContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            updateCustomerLocation: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateCustomerLocation(data)
                showGlobalSuccessMessage(this.$t('Location successfully updated'))
            } finally {
                await this.reloadCustomerLocationContext()
            }
        }
    }
}
</script>
