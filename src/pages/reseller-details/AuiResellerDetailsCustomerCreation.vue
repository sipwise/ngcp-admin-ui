<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-customer
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
            </aui-new-customer>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiResellerDetailsCustomerCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewCustomer
    },
    props: {
        id: {
            type: [String, Number],
            default: null
        }
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
