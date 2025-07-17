<template>
    <aui-base-edit-context>
        <aui-time-set-form
            v-if="resourceObject && initialData"
            :initial-form-data="initialData"
            :reseller-id="resourceObject.id"
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
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsTimeSetEdit',
    components: { AuiFormActionsUpdate, AuiTimeSetForm, AuiBaseEditContext },
    data () {
        return {
            initialData: null
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    async mounted () {
        await this.reload()
    },
    methods: {
        ...mapWaitingActions('timeSets', {
            updateTimeSet: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE
        }),
        async reload () {
            const timeSet = await this.loadTimeSet({ id: parseInt(this.$route.params.timeSetId, 10) })
            this.initialData = timeSet
        },
        async update (data) {
            await this.updateTimeSet(data)
            await this.reload()
            showGlobalSuccessMessage(this.$t('Timeset entry successfully updated'))
        }
    }
}
</script>
