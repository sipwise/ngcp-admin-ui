<template>
    <aui-new-reseller-branding
        :initial-form-data="branding"
        :loading="$waitPage($wait)"
        @submit="update"
    >
        <template
            #actions="{ hasInvalidData, hasUnsavedData, reset, submit }"
        >
            <aui-form-actions-update
                :close-button="false"
                :loading="$waitPage($wait)"
                :has-unsaved-data="hasUnsavedData"
                :has-invalid-data="hasInvalidData"
                @reset="reset"
                @submit="submit"
            />
        </template>
    </aui-new-reseller-branding>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewResellerBranding from 'components/edit-forms/AuiNewResellerBranding'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiBranding',
    components: {
        AuiFormActionsUpdate,
        AuiNewResellerBranding
    },
    computed: {
        ...mapState('resellers', [
            'branding'
        ]),
        resellerId () {
            return this.$route.params.id || null
        },
        isAdminView () {
            return !!this.$route.params.id
        }
    },
    async mounted () {
        this.$store.commit('resellers/resetBranding')
        await this.loadBranding()
    },
    methods: {
        ...mapWaitingActions('resellers', {
            fetchBranding: WAIT_PAGE,
            fetchResellerBranding: WAIT_PAGE,
            updateBranding: WAIT_PAGE
        }),
        async loadBranding () {
            const action = this.isAdminView ? this.fetchResellerBranding : this.fetchBranding
            const payload = { header: { 'Cache-Control': 'no-cache' },
                ...(this.isAdminView && { resellerId: this.resellerId }) }
            await action(payload)
        },
        async update (data) {
            await this.updateBranding({
                ...(this.resellerId && { resellerId: this.resellerId }),
                data
            })
            await this.loadBranding()
            showGlobalSuccessMessage(this.$t('Branding changed successfully'))
        }
    }
}
</script>
