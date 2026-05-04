<template>
    <aui-base-add-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-ncos-level-carrier
                v-if="ncoslevelContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :ncos-level-id="ncoslevelContext.id"
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
            </aui-new-ncos-level-carrier>
        </template>
    </aui-base-add-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewNcosLevelCarrier from 'components/edit-forms/AuiNewNCOSLevelCarrier'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrierCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiNewNcosLevelCarrier
    },
    mixins: [
        ncoslevelContextMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            createNCOSLevelCarrier: WAIT_PAGE
        }),
        async create (data) {
            await this.createNCOSLevelCarrier(data)
            showGlobalSuccessMessage(this.$t('NCOS lnp entry successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
