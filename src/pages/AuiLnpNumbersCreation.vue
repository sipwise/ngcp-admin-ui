<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-lnp-numbers
                :carrier="lnpCarrierContext.id"
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
            </aui-new-lnp-numbers>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewLnpNumbers from 'components/edit-forms/AuiNewLnpNumbers'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpNumbersCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewLnpNumbers,
        AuiBaseSubContext
    },
    mixins: [
        lnpCarrierContextMixin
    ],
    methods: {
        ...mapWaitingActions('lnp', {
            createLnpNumber: WAIT_PAGE
        }),
        async create (data) {
            await this.createLnpNumber(data)
            showGlobalSuccessMessage(this.$t('Ported Numbers created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
