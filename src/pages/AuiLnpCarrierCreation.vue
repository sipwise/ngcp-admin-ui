<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-lnp-carrier
                :initial-form-data="props.initialFormData"
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
            </aui-new-lnp-carrier>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewLnpCarrier from 'components/edit-forms/AuiNewLnpCarrier'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiLnpCarrierCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewLnpCarrier,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('lnp', {
            createLnpCarrier: WAIT_PAGE
        }),
        async create (data) {
            await this.createLnpCarrier(data)
            showGlobalSuccessMessage(this.$t('Number Porting created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
