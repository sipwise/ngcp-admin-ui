<template>
    <aui-base-edit-context>
        <aui-new-contract
            v-if="resourceObject"
            :type="resourceObject.type"
            :initial-form-data="resourceObject"
            :contact="resourceRelatedObjects.contact"
            :billing-profile="resourceRelatedObjects.billingProfile"
            :billing-profiles="resourceRelatedObjects.billingProfiles"
            :all-billing-profiles="resourceRelatedObjects.allBillingProfiles"
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
        </aui-new-contract>
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
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
export default {
    name: 'AuiContractEdit',
    components: {
        AuiFormActionsUpdate,
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
        async update (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateContract(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
