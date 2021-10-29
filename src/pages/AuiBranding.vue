<template>
    <aui-new-reseller-branding
        :initial-form-data="branding"
        :loading="$waitPage()"
        @submit="update"
    >
        <template
            #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
        >
            <aui-form-actions-update
                :close-button="false"
                :loading="$waitPage()"
                :has-unsaved-data="hasUnsavedData"
                :has-invalid-data="hasInvalidData"
                @reset="reset"
                @submit="submit"
            />
        </template>
    </aui-new-reseller-branding>
</template>

<script>
import AuiNewResellerBranding from 'components/edit-forms/AuiNewResellerBranding'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
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
        await this.fetchBranding({
            resellerId: this.$route.params.id
        })
    },
    methods: {
        ...mapWaitingActions('resellers', {
            fetchBranding: WAIT_PAGE,
            updateBranding: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBranding({
                resellerId: this.$route.params.id,
                data: data
            })
            await this.fetchBranding({
                resellerId: this.$route.params.id
            })
            showGlobalSuccessMessage(this.$t('Branding changed successfully'))
        }
    }
}
</script>
