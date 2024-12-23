<template>
    <aui-base-edit-context>
        <aui-time-set-form
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
        </aui-time-set-form>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiTimeSetForm from 'components/edit-forms/AuiTimeSetForm'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'AuiTimeSetEdit',
    components: { AuiFormActionsUpdate, AuiTimeSetForm, AuiBaseEditContext },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('timeSets', {
            updateTimeSet: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE
        }),
        ...mapActions('page', [
            'setContext'
        ]),
        async update (data) {
            try {
                await this.updateTimeSet(data)
                showGlobalSuccessMessage(this.$t('Timeset entry successfully updated'))
            } finally {
                const timeSet = await this.loadTimeSet({ id: parseInt(this.$route.params.id, 10) })
                await this.setContext({
                    resourceObject: timeSet
                })
            }
        }
    }
}
</script>
