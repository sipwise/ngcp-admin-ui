<template>
    <aui-base-sub-context>
        <aui-speed-dial-form
            v-if="formData"
            :initial-form-data="formData"
            :loading="$waitPage($wait)"
            :is-customer="true"
            :update-failures="updateFailures"
            @remove="remove"
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
        </aui-speed-dial-form>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiSpeedDialForm from 'components/edit-forms/AuiSpeedDialForm'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'

export default {
    name: 'AuiCustomerDetailsSpeedDialEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseSubContext,
        AuiSpeedDialForm
    },
    data () {
        return {
            formData: null,
            updateFailures: []
        }
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('customers', {
            loadCustomerSpeedDials: WAIT_PAGE,
            updateCustomerSpeedDials: WAIT_PAGE,
            deleteCustomerSpeedDial: WAIT_PAGE
        }),
        async reload () {
            this.formData = {
                speeddials: await this.loadCustomerSpeedDials(+this.$route.params.id)
            }
        },
        async update (data) {
            const failures = await this.updateCustomerSpeedDials({
                data: data.speeddials,
                originalData: this.formData.speeddials,
                customer_id: +this.$route.params.id
            })

            this.updateFailures = failures
            await this.reload()

            if (failures.length > 0) {
                showGlobalErrorMessage(this.$t('Failed to update speed dial slots'))
            } else {
                showGlobalSuccessMessage(this.$t('Successfully updated speed dial slots'))
            }
        },
        async remove (speedDialId) {
            try {
                await this.deleteCustomerSpeedDial(speedDialId)
                showGlobalSuccessMessage(this.$t('Successfully removed speed dial slot'))
            } finally {
                await this.reload()
            }
        }
    }
}
</script>
