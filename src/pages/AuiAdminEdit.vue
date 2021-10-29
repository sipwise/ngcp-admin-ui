<template>
    <aui-base-edit-context>
        <aui-new-admin
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :reseller="resourceRelatedObjects.reseller"
            :enable-password="false"
            :loading="$waitPage()"
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
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'

export default {
    name: 'AuiAdminEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewAdmin
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapActions('administrators', [
            'updateAdministrator'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateAdministrator(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Administrator saved successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
