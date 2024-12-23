<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-customer
                :initial-form-data="props.initialFormData"
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
            </aui-new-customer>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewCustomer
    },
    methods: {
        ...mapWaitingActions('customers', {
            createCustomer: WAIT_PAGE
        }),
        async create (data) {
            await this.createCustomer(data)
            showGlobalSuccessMessage(this.$t('Customer created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
