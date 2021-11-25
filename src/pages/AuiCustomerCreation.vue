<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-customer
                :initial-form-data="props.initialFormData"
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
            </aui-new-customer>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { mapActions } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiCustomerCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewCustomer
    },
    methods: {
        ...mapActions('customers', [
            'createCustomer'
        ]),
        async create (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createCustomer(data)
                this.$goBack()
                showGlobalSuccessMessage(this.$t('Customer created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
