<template>
    <aui-base-sub-context>
        <aui-speed-dial-form
            v-if="dataContextObject && dataContextObject.items"
            :initial-form-data="{speeddials: dataContextObject.items}"
            :loading="dataContextLoading"
            :is-customer="true"
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
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContext from 'src/mixins/data-context'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsSpeedDialEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseSubContext,
        AuiSpeedDialForm
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'v2/customerspeeddials'
        },
        dataContextFilters () {
            return {
                customer_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateCustomerSpeedDials: WAIT_PAGE,
            deleteCustomerSpeedDial: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateCustomerSpeedDials({ data: data.speeddials, customer_id: +this.$route.params.id })
                showGlobalSuccessMessage(this.$t('Successfully updated speed dial slots'))
            } finally {
                await this.dataContextLoad()
            }
        },
        async remove (speedDialId) {
            try {
                await this.deleteCustomerSpeedDial(speedDialId)
                showGlobalSuccessMessage(this.$t('Successfully removed speed dial slot'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
