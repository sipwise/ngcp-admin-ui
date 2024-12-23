<template>
    <aui-base-edit-context>
        <aui-new-ncos-level-pattern
            v-if="ncoslevelContext && ncoslevelPatternContext"
            :initial-form-data="ncoslevelPatternContext"
            :loading="$waitPage($wait)"
            :ncos-level-id="ncoslevelContext.id"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-ncos-level-pattern>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewNcosLevelPattern from 'components/edit-forms/AuiNewNCOSLevelPattern'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import ncoslevelContextMixin from 'src/mixins/data-context-pages/ncoslevel'
import ncoslevelPatternContextMixin from 'src/mixins/data-context-pages/ncoslevel-details-pattern'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNCOSLevelsDetailsNumberPatternEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewNcosLevelPattern
    },
    mixins: [
        ncoslevelContextMixin,
        ncoslevelPatternContextMixin
    ],
    methods: {
        ...mapWaitingActions('ncosLevels', {
            updateNCOSLevelPattern: WAIT_PAGE
        }),
        async update (data) {
            try {
                const payload = {
                    description: data.description,
                    pattern: data.pattern,
                    ncos_level_id: data.ncos_level_id
                }
                await this.updateNCOSLevelPattern({ id: data.id, payload })
                showGlobalSuccessMessage(this.$t('NCOS pattern successfully updated'))
            } finally {
                await this.reloadNcoslevelPatternContext()
            }
        }
    }
}
</script>
