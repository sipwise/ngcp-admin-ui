<template>
    <div>
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-xl"
                :disable="isPageLoading"
                @click="triggerSubmit"
            />
            <aui-reset-button
                class="q-mr-sm"
                :disable="isPageLoading"
                @click="triggerReset"
            />
            <aui-close-button
                class="q-mr-sm"
                :disable="isPageLoading"
                @click="$router.push({ name: 'contractList' })"
            />
        </portal>
        <aui-new-contract
            v-if="resourceObject"
            ref="form"
            :value="resourceObject"
            :relations="resourceRelatedObjects"
            :type="resourceObject.type"
            :loading="isPageLoading"
            @input="submit"
            @activate-billing-profile="activateBillingProfileEvent"
        />
    </div>
</template>
<script>
import AuiNewContract from 'components/edit-forms/AuiNewContract'
import {
    mapActions,
    mapState
} from 'vuex'
import {
    mapWaitingGetters
} from 'vue-wait'
import {
    WAIT_CONTEXT_AWARE_PAGE
} from 'src/constants'
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiResetButton from 'components/buttons/AuiResetButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    components: {
        AuiCloseButton,
        AuiResetButton,
        AuiSaveButton,
        AuiNewContract
    },
    data () {
        return {
            period: null
        }
    },
    computed: {
        ...mapWaitingGetters({
            isPageLoading: WAIT_CONTEXT_AWARE_PAGE
        }),
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapActions('contracts', [
            'updateContract',
            'activateBillingProfile'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async submit (data) {
            try {
                this.$wait.start(WAIT_CONTEXT_AWARE_PAGE)
                await this.updateContract(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
            } catch (err) {
                this.triggerReset()
                throw err
            } finally {
                this.$wait.end(WAIT_CONTEXT_AWARE_PAGE)
            }
        },
        async activateBillingProfileEvent (payload) {
            try {
                this.$wait.start(WAIT_CONTEXT_AWARE_PAGE)
                await this.activateBillingProfile(payload)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Billing Profile activated successfully'))
            } catch (err) {
                this.triggerReset()
                throw err
            } finally {
                this.$refs.form.disableBillingProfileActivation()
                this.$wait.end(WAIT_CONTEXT_AWARE_PAGE)
            }
        },
        triggerSubmit () {
            this.$refs.form.submit()
        },
        triggerReset () {
            this.$refs.form.reset()
        }
    }
}
</script>
