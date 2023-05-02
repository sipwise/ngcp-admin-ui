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
            if (this.$route.params.id) {
                await this.updateBranding({
                    resellerId: this.$route.params.id,
                    data: data
                })
                await this.fetchBranding({
                    resellerId: this.$route.params.id
                })
            } else {
                await this.updateBranding({
                    data: data
                })
                await this.fetchBranding()
            }
            showGlobalSuccessMessage(this.$t('Branding changed successfully'))
        }
    }
}
</script>
