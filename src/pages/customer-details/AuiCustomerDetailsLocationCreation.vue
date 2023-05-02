<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-customer-location
                v-if="customerContext"
                :initial-form-data="initialFormData"
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
            </aui-new-customer-location>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewCustomerLocation from 'components/edit-forms/AuiNewCustomerLocation'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewCustomerLocation
    },
    mixins: [
        customerContextMixin
    ],
    computed: {
        getDefaultData () {
            return {
                name: null,
                description: null,
                blocks: [{
                    ip: null,
                    mask: null
                }]
            }
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            createLocation: WAIT_PAGE
        }),
        async create (data) {
            data.contract_id = this.customerContext.id
            await this.createLocation(data)
            showGlobalSuccessMessage(this.$t('Successfully created location'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
