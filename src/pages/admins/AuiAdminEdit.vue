<template>
    <aui-base-edit-context>
        <aui-new-admin
            v-if="admin"
            :initial-form-data="admin"
            :reseller="reseller"
            :enable-password="false"
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
        </aui-new-admin>
    </aui-base-edit-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'

export default {
    name: 'AuiAdminEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewAdmin
    },
    mixins: [dataContextPageMixin],
    computed: {
        admin () {
            return this.getDataContextObject('adminContext')
        },
        reseller () {
            return this.admin?.reseller_id_expand
        }
    },
    methods: {
        ...mapWaitingActions('administrators', {
            updateAdministrator: WAIT_PAGE
        }),
        async update (data) {
            await this.updateAdministrator(data)
            await this.reloadDataContext('adminContext')
            showGlobalSuccessMessage(this.$t('Administrator saved successfully'))
        }
    }
}
</script>
