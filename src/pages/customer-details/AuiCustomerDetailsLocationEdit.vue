<template>
    <aui-base-edit-context>
        <aui-new-customer-location
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
            :subscriber-id="dataContextRootObject.id"
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
import dataContext from 'src/mixins/data-context'
import AuiNewCustomerLocation from 'components/edit-forms/AuiNewCustomerLocation'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsLocationEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCustomerLocation
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'customerlocations'
        },
        dataContextResourceId () {
            return this.$route.params.locationId
        },
        dataContextFilters () {
            return {
                customer_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateCustomerLocation: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateCustomerLocation(data)
                showGlobalSuccessMessage(this.$t('Location successfully updated'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
