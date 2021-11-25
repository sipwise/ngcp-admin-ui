<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-contact
                :initial-form-data="props.initialFormData"
                :has-reseller="hasReseller"
                :loading="$waitPage()"
                @submit="create"
            >
                <template
                    #actions="{ loading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-contact>
        </template>
    </aui-base-add-page>
</template>
<script>
import AuiNewContact from 'components/edit-forms/AuiNewContact'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { mapActions } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
export default {
    name: 'AuiContactCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddPage,
        AuiNewContact
    },
    props: {
        hasReseller: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapActions('contact', [
            'createCustomerContact',
            'createSystemContact'
        ]),
        async create (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                if (data.reseller_id) {
                    await this.createCustomerContact(data)
                } else {
                    await this.createSystemContact(data)
                }
                this.$goBack()
                showGlobalSuccessMessage(this.$t('Contact created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
