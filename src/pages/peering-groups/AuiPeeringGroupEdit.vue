<template>
    <aui-base-edit-context>
        <aui-new-peering
            v-if="peeringObject"
            :initial-form-data="peeringObject"
            :contract="peeringObject.contract_id.expand"
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
        </aui-new-peering>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewPeering from 'components/edit-forms/AuiNewPeering'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringGroupEdit',
    components: { AuiFormActionsUpdate, AuiNewPeering, AuiBaseEditContext },
    mixins: [dataContextPageMixin],
    computed: {
        peeringObject () {
            return this.getDataContextObject('peeringGroupContext')
        }
    },
    methods: {
        ...mapWaitingActions('peering', {
            updatePeering: WAIT_PAGE
        }),
        async update (data) {
            await this.updatePeering({
                id: this.peeringObject.id,
                payload: data
            })
            await this.reloadDataContext('peeringGroupContext')
            showGlobalSuccessMessage(this.$t('Peering Group saved successfully'))
        }
    }
}
</script>
