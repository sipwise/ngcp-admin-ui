<template>
    <aui-base-edit-context>
        <aui-new-subscriber-trusted-sources
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
        </aui-new-subscriber-trusted-sources>
    </aui-base-edit-context>
</template>

<script>
import dataContext from 'src/mixins/data-context'
import AuiNewSubscriberTrustedSources from 'components/edit-forms/AuiNewSubscriberTrustedSources'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsTrustedSourcesEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberTrustedSources
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'trustedsources'
        },
        dataContextResourceId () {
            return this.$route.params.trustedSourceId
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberTrustedSource: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberTrustedSource(data)
                showGlobalSuccessMessage(this.$t('Successfully updated trusted source'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
