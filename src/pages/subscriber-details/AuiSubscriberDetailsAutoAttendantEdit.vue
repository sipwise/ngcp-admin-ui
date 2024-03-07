<template>
    <aui-base-sub-context>
        <aui-auto-attendant-form
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
        </aui-auto-attendant-form>
    </aui-base-sub-context>
</template>

<script>
import dataContext from 'src/mixins/data-context'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import AuiAutoAttendantForm from 'components/edit-forms/AuiAutoAttendantForm'
export default {
    name: 'AuiSubscriberDetailsAutoAttendantEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseSubContext,
        AuiAutoAttendantForm
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'autoattendants'
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
            updateSubscriberAutoAttendant: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberAutoAttendant({ data, subscriber_id: this.$route.params.id })
                showGlobalSuccessMessage(this.$t('Successfully updated Auto Attendant slots'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
