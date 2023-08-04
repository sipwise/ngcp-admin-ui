<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-ncos-level-pattern
                v-if="ncoslevelCarrierContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :ncos-lnp-list-id="ncoslevelCarrierContext.id"
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
            </aui-new-ncos-level-pattern>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewNcosLevelPattern from 'components/edit-forms/AuiNewNCOSLevelPattern'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import ncoslevelCarrierContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-carrier'
export default {
    name: 'AuiNCOSLevelsDetailsLnpCarrierPatternCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewNcosLevelPattern
    },
    mixins: [
        ncoslevelCarrierContextMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            createNCOSLevelCarrierPattern: WAIT_PAGE
        }),
        async create (data) {
            await this.createNCOSLevelCarrierPattern(data)
            showGlobalSuccessMessage(this.$t('NCOS pattern successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
