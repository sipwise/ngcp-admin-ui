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
        ])
    },
    async mounted () {
        this.$store.commit('resellers/resetBranding')
        if (this.$route.params.id) {
            await this.fetchBranding({
                resellerId: this.$route.params.id
            })
        } else {
            await this.fetchBranding()
        }
    },
    methods: {
        ...mapWaitingActions('resellers', {
            fetchBranding: WAIT_PAGE,
            updateBranding: WAIT_PAGE
        }),
        async update (data) {
            const resellerId = this.$route.params.id || null
            await this.updateBranding({
                ...(resellerId && { resellerId }),
                data
            })
            await this.fetchBranding({
                ...(resellerId && { resellerId }),
                header: { 'Cache-Control': 'no-cache' }
            })
            showGlobalSuccessMessage(this.$t('Branding changed successfully'))
        }
    }
}
</script>
