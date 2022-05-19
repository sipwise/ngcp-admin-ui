<template>
    <aui-base-edit-context>
        <template
            #default="props"
        >
            <aui-new-customer-location
                v-if="resourceObject"
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
import { mapState } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewCustomerLocation
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceId'
        ]),
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
            data.contract_id = this.resourceId // A hack to comply with the API format
            await this.createLocation(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created location'))
        }
    }
}
</script>
