<template>
    <aui-base-edit-context>
        <aui-new-subscriber-call-through-CLIs
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
        </aui-new-subscriber-call-through-CLIs>
    </aui-base-edit-context>
</template>

<script>
import dataContext from 'src/mixins/data-context'
import AuiNewSubscriberCallThroughCLIs from 'components/edit-forms/AuiNewSubscriberCallThroughCLIs'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsCallthroughCLIsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberCallThroughCLIs
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'ccmapentries'
        },
        dataContextResourceId () {
            return this.$route.params.id
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberCCmappings: WAIT_PAGE
        }),
        async update (data) {
            try {
                data.subscriber_id = this.$route.params.id
                await this.updateSubscriberCCmappings(data)
                showGlobalSuccessMessage(this.$t('Successfully updated ccmappings'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
