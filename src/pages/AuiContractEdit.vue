<template>
    <aui-base-edit-context
        @form-input="triggerUpdate"
    >
        <aui-new-contract
            v-if="resourceObject"
            ref="form"
            :type="resourceObject.type"
            :contract="resourceObject"
            :contact="resourceRelatedObjects.contact"
            :billing-profile="resourceRelatedObjects.billingProfile"
            :billing-profiles="resourceRelatedObjects.billingProfiles"
            :all-billing-profiles="resourceRelatedObjects.allBillingProfiles"
            :loading="$waitPage()"
        />
    </aui-base-edit-context>
</template>
<script>
import {
    mapActions,
    mapState
} from 'vuex'
import {
    WAIT_PAGE
} from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiNewContract from 'components/edit-forms/AuiNewContract'
export default {
    components: {
        AuiBaseEditContext,
        AuiNewContract
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapActions('contracts', [
            'updateContract'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateContract(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
            } catch (err) {
                this.$refs.form.reset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
