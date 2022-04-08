<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-contract
                :initial-form-data="props.initialFormData"
                :loading="$waitPage()"
                :type="type"
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
            </aui-new-contract>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiNewContract from 'components/edit-forms/AuiNewContract'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiContractCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewContract
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapWaitingActions('contracts', {
            createContract: WAIT_PAGE
        }),
        async create (data) {
            await this.createContract(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Contract created successfully'))
        }
    }
}
</script>
