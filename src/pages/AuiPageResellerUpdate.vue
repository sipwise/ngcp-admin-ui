<template>
    <aui-page-form-update
        ref="updatePage"
        icon="fas fa-users"
        resource="resellers"
        :resource-id="$route.params.id"
        :resource-relations="resourceRelations"
        resource-name-field="name"
        :resource-singular="$t('Reseller')"
        :loading="loading"
        :list-route="listRoute"
        :input-changed="!hasUnsavedData"
        @save="save"
        @reset="reset"
        @resource-loaded="resourceLoaded"
    >
        <div
            class="row"
        >
            <aui-new-reseller
                ref="form"
                class="col-xs-12 col-md-9 col-lg-6"
                :reseller="reseller"
                :contract="contract"
                :loading="loading"
                @saved="saved"
                @has-unsaved-data="hasUnsavedDataEvent"
            />
        </div>
    </aui-page-form-update>
</template>
<script>
import AuiPageFormUpdate from 'pages/AuiPageFormUpdate'
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import { apiFetchEntity } from 'src/api/common'
export default {
    name: 'AuiPageResellerUpdate',
    components: {
        AuiNewReseller,
        AuiPageFormUpdate
    },
    data () {
        return {
            reseller: null,
            contract: null,
            hasUnsavedData: true
        }
    },
    computed: {
        listRoute () {
            return '/reseller'
        },
        resourceRelations () {
            return {
                contract_id: {
                    resource: 'contracts'
                }
            }
        },
        loading () {
            return this.$wait.is('aui-reseller-*') || this.$wait.is('aui-resource-object') || this.$wait.is('aui-contract-object')
        }
    },
    methods: {
        save () {
            this.$refs.form.submit()
        },
        reset () {
            this.$refs.form.reset()
        },
        saved () {
            this.$refs.updatePage.load()
            // this.$router.push({ path: this.listRoute })
        },
        async resourceLoaded (payload) {
            let contact
            // trying to get "contact_email" for the Contract
            if (payload.resourceRelatedObjects.contract_id && payload.resourceRelatedObjects.contract_id.contact_id) {
                const contactId = payload.resourceRelatedObjects.contract_id.contact_id
                this.$wait.start('aui-contract-object')
                try {
                    contact = await apiFetchEntity('systemcontacts', contactId)
                } catch (e) {
                    if (e?.response?.status === 404) {
                        try {
                            contact = await apiFetchEntity('customercontacts', contactId)
                        } catch (e) {
                            if (e?.response?.status === 404) {
                                // just skip it
                            } else {
                                throw e
                            }
                        }
                    } else {
                        throw e
                    }
                } finally {
                    this.$wait.end('aui-contract-object')
                }
                if (contact) {
                    payload.resourceRelatedObjects.contract_id.contact_email = contact.email
                }
            }

            this.reseller = payload.resourceObject
            this.contract = payload.resourceRelatedObjects.contract_id
        },
        hasUnsavedDataEvent (hasUnsavedData) {
            this.hasUnsavedData = hasUnsavedData
        }
    }
}
</script>
