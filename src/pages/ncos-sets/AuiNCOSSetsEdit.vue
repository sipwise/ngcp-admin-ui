<template>
    <aui-base-sub-context>
        <aui-new-ncos-set
            v-if="ncosSet"
            :initial-form-data="ncosSet"
            :reseller="ncosSet.reseller_id_expand"
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
        </aui-new-ncos-set>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewNcosSet from 'components/edit-forms/AuiNewNCOSSet'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNCOSSetsEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewNcosSet
    },
    mixins: [dataContextPageMixin],
    computed: {
        ncosSet () {
            return this.getDataContextObject('ncosSetsContext')
        }
    },
    methods: {
        ...mapWaitingActions('ncosSets', {
            updateNCOSSet: WAIT_PAGE
        }),
        async update (data) {
            await this.updateNCOSSet({
                id: this.ncosSet.id,
                payload: data
            })
            await this.reloadDataContext('ncosSetsContext')
            showGlobalSuccessMessage(this.$t('NCOS Set saved successfully'))
        }
    }
}
</script>
