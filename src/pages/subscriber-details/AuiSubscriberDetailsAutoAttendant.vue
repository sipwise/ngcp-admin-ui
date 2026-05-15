<template>
    <aui-base-edit-context>
        <aui-auto-attendant-form
            :initial-form-data="dataContextObject"
            :loading="$waitPage($wait)"
            :can-edit="canEdit"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    v-if="canEdit"
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    :close-button="false"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-auto-attendant-form>
     </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiAutoAttendantForm from 'components/edit-forms/AuiAutoAttendantForm'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import dataContext from 'src/mixins/data-context'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'

export default {
    name: 'AuiSubscriberDetailsAutoAttendant',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiAutoAttendantForm
    },
    mixins: [
        dataContext
    ],
    computed: {
        canEdit() {
            return this.$aclCan('update', 'entity.autoattendants') && this.$aclCan('update', 'entity.subscribers')
        },
        dataContextResource() {
            return 'autoattendants'
        },
        dataContextResourceId () {
            return this.$route.params.id
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        },
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberAutoAttendant: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberAutoAttendant({
                    data,
                    subscriber_id: this.$route.params.id
                })
                showGlobalSuccessMessage(this.$t('Successfully updated Auto Attendant slots'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
