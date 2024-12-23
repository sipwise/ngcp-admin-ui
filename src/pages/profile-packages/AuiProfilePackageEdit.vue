<template>
    <aui-base-edit-context>
        <aui-new-profile
            v-if="billingProfilePackageContext"
            :initial-form-data="billingProfilePackageContext"
            :reseller="billingProfilePackageContextReseller"
            :billing-profiles="billingProfiles"
            :underrun-profiles="underrunProfiles"
            :topup-profiles="topupProfiles"
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
        </aui-new-profile>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewProfile from 'components/edit-forms/AuiNewProfile'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import billingProfilePackageContextMixin from 'src/mixins/data-context-pages/profile-packages'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiProfilePackageEdit',
    components: { AuiFormActionsUpdate, AuiNewProfile, AuiBaseEditContext },
    mixins: [dataContextPageMixin, billingProfilePackageContextMixin],
    computed: {
        billingProfiles () {
            return this.billingProfilePackageContextBillingProfiles
        },
        underrunProfiles () {
            return this.billingProfilePackageContextUnderrunProfiles
        },
        topupProfiles () {
            return this.billingProfilePackageContextTopupProfiles
        }
    },
    methods: {
        ...mapWaitingActions('billing', {
            updateProfilePackages: WAIT_PAGE
        }),
        async update (data) {
            await this.updateProfilePackages({
                id: this.billingProfilePackageContext.id,
                payload: data
            })
            await this.reloadDataContext('billingProfilePackageContext')
            showGlobalSuccessMessage(this.$t('Profile Package saved successfully'))
        }
    }
}
</script>
