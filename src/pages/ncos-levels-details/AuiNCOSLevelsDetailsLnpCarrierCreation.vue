<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-ncos-level-carrier
                v-if="ncoslevelContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage()"
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
    </aui-base-edit-context>
</template>

<script>
import AuiNewNcosLevelCarrier from 'components/edit-forms/AuiNewNCOSLevelCarrier'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
export default {
    name: 'AuiNCOSLevelsDetailsNumberPatternCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
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
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('NCOS lnp entry successfully created'))
        }
    }
}
</script>
