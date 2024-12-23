<template>
    <aui-base-sub-context>
        <aui-new-ncos-level
            v-if="ncosLevel"
            :initial-form-data="ncosLevel"
            :reseller="ncosLevel.reseller_id_expand"
            :loading="$waitPage($wait)"
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
        </aui-new-ncos-level>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewNcosLevel from 'components/edit-forms/AuiNewNCOSLevel'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNCOSLevelsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewNcosLevel
    },
    mixins: [dataContextPageMixin],
    computed: {
        ncosLevel () {
            return this.getDataContextObject('ncosLevelsContext')
        }
    },
    methods: {
        ...mapWaitingActions('ncosLevels', {
            updateNCOSLevel: WAIT_PAGE
        }),
        async update (data) {
            await this.updateNCOSLevel({
                id: this.ncosLevel.id,
                payload: data
            })
            await this.reloadDataContext('ncosLevelsContext')
            showGlobalSuccessMessage(this.$t('NCOS Level saved successfully'))
        }
    }
}
</script>
