<template>
    <aui-base-edit-context>
        <aui-new-contact
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :reseller="reseller"
            :has-reseller="!!reseller"
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
        </aui-new-contact>
    </aui-base-edit-context>
</template>

<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewContact from 'components/edit-forms/AuiNewContact'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import {
    mapActions,
    mapState
} from 'vuex'
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
                if (this.$route.query?.resource === 'customercontacts') {
                    await this.updateCustomerContact(data)
                } else {
                    await this.updateSystemContact(data)
                }
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Contact saved successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
