<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-contract
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewContract from 'components/edit-forms/AuiNewContract'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
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
            showGlobalSuccessMessage(this.$t('Contract created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
