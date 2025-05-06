<template>
    <aui-base-add-context>
        <aui-new-pbx-device
            v-if="customerContext"
            :loading="$waitPage($wait)"
            :customer-id="customerContext.id"
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
        </aui-new-pbx-device>
    </aui-base-add-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewPbxDevice from 'components/edit-forms/AuiNewPbxDevice'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsPbxDeviceCreation',
    components: {
        AuiNewPbxDevice,
        AuiBaseAddContext,
        AuiFormActionsCreation
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            createPbxDevice: WAIT_PAGE
        }),
        async create (data) {
            await this.createPbxDevice(data)
            showGlobalSuccessMessage(this.$t('PBX Device successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
