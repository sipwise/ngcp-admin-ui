<template>
    <aui-base-edit-context
        :has-unsaved-data="hasUnsavedData"
        @save="triggerSave"
        @reset="triggerReset"
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
            :loading="loading"
            @has-unsaved-data="hasUnsavedData=$event"
            @input="submit"
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
    data () {
        return {
            hasUnsavedData: false
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        loading () {
            return this.$wait.is(WAIT_PAGE)
        }
    },
    methods: {
        ...mapActions('contracts', [
            'updateContract'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async submit (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateContract(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
            } catch (err) {
                this.triggerReset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        },
        triggerSave () {
            this.$refs.form.submit()
        },
        triggerReset () {
            this.$refs.form.reset()
        }
    }
}
</script>
