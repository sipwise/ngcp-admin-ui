<template>
    <aui-base-edit-context>
        <aui-new-lnp-carrier
            v-if="lnpObject"
            :initial-form-data="lnpObject"
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
        </aui-new-lnp-carrier>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewLnpCarrier from 'components/edit-forms/AuiNewLnpCarrier'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpCarrierEdit',
    components: { AuiFormActionsUpdate, AuiNewLnpCarrier, AuiBaseEditContext },
    mixins: [dataContextPageMixin],
    computed: {
        lnpObject () {
            return this.getDataContextObject('lnpCarrierContext')
        }
    },
    methods: {
        ...mapWaitingActions('lnp', {
            updateLnpCarrier: WAIT_PAGE
        }),
        async update (data) {
            await this.updateLnpCarrier({
                id: this.lnpObject.id,
                payload: data
            })
            await this.reloadDataContext('lnpCarrierContext')
            showGlobalSuccessMessage(this.$t('Number porting saved successfully'))
        }
    }
}
</script>
