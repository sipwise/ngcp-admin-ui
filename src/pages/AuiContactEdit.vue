<template>
    <aui-base-edit-context>
        <aui-new-contact
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :reseller="reseller"
            :has-reseller="!!reseller"
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
        </aui-new-contact>
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
import AuiNewContact from 'components/edit-forms/AuiNewContact'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
export default {
    name: 'AuiContactEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewContact
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        reseller () {
            return this.resourceRelatedObjects?.reseller
        }
    },
    methods: {
        ...mapActions('contact', [
            'updateCustomerContact',
            'updateSystemContact'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async update (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                if (this.reseller) {
                    await this.updateCustomerContact(data)
                } else {
                    await this.updateSystemContact(data)
                }
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contract saved successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
