<template>
    <aui-base-add-page
        ref="addPage"
        @form-input="triggerCreation"
    >
        <aui-new-customer
            :loading="$waitPage()"
        />
    </aui-base-add-page>
</template>
<script>
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { mapActions } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiCustomerCreation',
    components: {
        AuiBaseAddPage,
        AuiNewCustomer
    },
    methods: {
        ...mapActions('customers', [
            'createCustomer'
        ]),
        async triggerCreation (data) {
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
