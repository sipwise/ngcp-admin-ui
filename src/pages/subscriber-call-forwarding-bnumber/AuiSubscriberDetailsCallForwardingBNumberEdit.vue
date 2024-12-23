<template>
    <aui-base-edit-context>
        <aui-new-call-forwarding-b-number
            v-if="subscriberContext && bnumberSetContext"
            :initial-form-data="bnumberSetContext"
            :loading="$waitPage($wait)"
            :subscriber-id="subscriberContext.id"
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
        </aui-new-call-forwarding-b-number>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCallForwardingBNumber from 'components/edit-forms/AuiNewCallForwardingBNumber'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import bnumberSetContextMixin from 'src/mixins/data-context-pages/subscriber-details-callforwarding-bnumberset'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuisubscriberDetailsCallForwardingSourceEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCallForwardingBNumber
    },
    mixins: [
        bnumberSetContextMixin,
        subscriberContextMixin
    ],
    methods: {
        ...mapWaitingActions('subscribers', {
            updateBNumberSet: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateBNumberSet(data)
                showGlobalSuccessMessage(this.$t('B-Number Set successfully updated'))
            } finally {
                await this.reloadBNumberSetContext()
            }
        }
    }
}
</script>
