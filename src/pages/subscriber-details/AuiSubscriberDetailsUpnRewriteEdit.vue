<template>
    <aui-base-edit-context>
        <aui-new-subscriber-upn-rewrite
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
            :subscriber-id="dataContextRootObject.id"
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
        </aui-new-subscriber-upn-rewrite>
    </aui-base-edit-context>
</template>

<script>
import dataContext from 'src/mixins/data-context'
import AuiNewSubscriberUpnRewrite from 'components/edit-forms/AuiNewSubscriberUpnRewrite'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsUpnRewriteEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberUpnRewrite
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'upnrewritesets'
        },
        dataContextResourceId () {
            return this.$route.params.upnRewriteId
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberUpnRewrite: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberUpnRewrite(data)
                showGlobalSuccessMessage(this.$t('Successfully updated UPN rewrite set'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
