<template>
    <aui-base-add-page
        @save="$refs.form.submit()"
    >
        <aui-new-customer
            ref="form"
            :loading="loading"
            @input="triggerCreation"
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
    computed: {
        loading () {
            return this.$wait.is(WAIT_PAGE)
        }
    },
    methods: {
        ...mapActions('customers', [
            'createCustomer'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createCustomer(data)
                await this.$router.push({ name: 'customerList' })
                showGlobalSuccessMessage(this.$t('Customer created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
