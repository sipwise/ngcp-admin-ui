<template>
    <aui-base-edit-context>
        <aui-new-call-list-suppression
            v-if="resourceObject"
            :initial-form-data="resourceObject"
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
        </aui-new-call-list-suppression>
    </aui-base-edit-context>
</template>

<script>
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiNewCallListSuppression from 'components/edit-forms/AuiNewCallListSuppression'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { mapState, mapActions } from 'vuex'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiCallListSuppressionEdit',
    components: { AuiFormActionsUpdate, AuiNewCallListSuppression, AuiBaseEditContext },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('callListSuppressions', {
            updateCallListSuppression: WAIT_PAGE,
            loadCallListSuppression: WAIT_PAGE
        }),
        ...mapActions('page', [
            'setContext'
        ]),
        async update (data) {
            try {
                await this.updateCallListSuppression({
                    ...data,
                    id: this.resourceObject.id
                })
                showGlobalSuccessMessage(this.$t('Call list suppression saved successfully'))
            } finally {
                const callListSuppression = await this.loadCallListSuppression({ id: parseInt(this.$route.params.id, 10) })
                await this.setContext({
                    resourceObject: callListSuppression
                })
            }
        }
    }
}
</script>
