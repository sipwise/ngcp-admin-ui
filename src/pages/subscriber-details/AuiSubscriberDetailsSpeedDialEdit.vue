<template>
    <aui-base-sub-context>
        <aui-speed-dial-form
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
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
        </aui-speed-dial-form>
    </aui-base-sub-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiSpeedDialForm from 'components/edit-forms/AuiSpeedDialForm'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContext from 'src/mixins/data-context'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsSpeedDialEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseSubContext,
        AuiSpeedDialForm
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'speeddials'
        },
        dataContextResourceId () {
            return this.$route.params.id
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberSpeedDials: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberSpeedDials({ data, subscriber_id: this.$route.params.id })
                showGlobalSuccessMessage(this.$t('Successfully updated speed dial slots'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
