<template>
    <aui-base-edit-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-ncos-level-pattern
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
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
export default {
    name: 'AuiNCOSLevelsDetailsNumberPatternCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewNcosLevelPattern
    },
    mixins: [
        ncoslevelContextMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            createNCOSLevelPattern: WAIT_PAGE
        }),
        async create (data) {
            await this.createNCOSLevelPattern(data)
            showGlobalSuccessMessage(this.$t('NCOS pattern successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
