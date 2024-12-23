<template>
    <aui-base-sub-context>
        <aui-form-actions-update
            v-if="canEdit"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :close-button="false"
            @submit="submit"
            @reset="reset"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <aui-fax-server-settings-form
                    v-if="subscriberContext && faxServerSettings"
                    ref="faxServerSettingsForm"
                    :initial-form-data="faxServerSettings"
                    :subscriber-id="subscriberContext.id"
                    :loading="loading"
                    @has-unsaved-data="updateFaxServerSettingsHasUnsavedData"
                    @has-invalid-data="updateHasInvalidData"
                    @submit="submitFaxServerSettings"
                />
            </div>
            <div
                class="col-md-6 col-xs-12"
            >
                <aui-mail-to-fax-settings-form
                    v-if="subscriberContext && mailToFaxSettings"
                    ref="mailToFaxSettingsForm"
                    :initial-form-data="mailToFaxSettings"
                    :subscriber-id="subscriberContext.id"
                    :loading="loading"
                    @has-unsaved-data="updateMailToFaxSettingsHasUnsavedData"
                    @has-invalid-data="updateHasInvalidData"
                    @submit="submitMailToFaxSettings"
                />
            </div>
        </div>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiFaxServerSettingsForm from 'components/edit-forms/fax-settings/AuiFaxServerSettingsForm'
import AuiMailToFaxSettingsForm from 'components/edit-forms/fax-settings/AuiMailToFaxSettingsForm'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import { mapWaitingActions } from 'vue-wait'
export default {
    components: {
        AuiFormActionsUpdate,
        AuiMailToFaxSettingsForm,
        AuiFaxServerSettingsForm,
        AuiBaseSubContext
    },
    mixins: [
        subscriberContextMixin
    ],
    data () {
        return {
            hasFaxServerSettingsUnsavedData: false,
            hasMailToFaxSettingsUnsavedData: false,
            hasInvalidData: false,
            hasResourceObjectLoaded: false
        }
    },
    computed: {
        loading () {
            return this.$wait.is(WAIT_PAGE)
        },
        faxServerSettingsObjectId () {
            return `faxserversettings/${this.subscriberContext.id}`
        },
        mailToFaxSettingsObjectId () {
            return `mailtofaxsettings/${this.subscriberContext.id}`
        },
        faxServerSettings () {
            return this.$store.state.page[this.faxServerSettingsObjectId]
        },
        mailToFaxSettings () {
            return this.$store.state.page[this.mailToFaxSettingsObjectId]
        },
        hasUnsavedData () {
            return this.hasFaxServerSettingsUnsavedData || this.hasMailToFaxSettingsUnsavedData
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    watch: {
        subscriberContext: {
            handler (resourceObject) {
                if (resourceObject && !this.hasResourceObjectLoaded) {
                    this.reloadDataContext()
                    this.hasResourceObjectLoaded = true
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapWaitingActions('page', {
            loadDataContext: WAIT_PAGE
        }),
        ...mapWaitingActions('subscribers', {
            updateFaxServerSettings: WAIT_PAGE,
            updateMailToFaxSettings: WAIT_PAGE
        }),
        updateFaxServerSettingsHasUnsavedData (hasUnsavedData) {
            this.hasFaxServerSettingsUnsavedData = hasUnsavedData
        },
        updateMailToFaxSettingsHasUnsavedData (hasUnsavedData) {
            this.hasMailToFaxSettingsUnsavedData = hasUnsavedData
        },
        updateHasInvalidData (hasInvalidData) {
            this.hasInvalidData = hasInvalidData
        },
        async submitFaxServerSettings (data) {
            await this.updateFaxServerSettings(data)
            await this.loadDataContext({
                resource: 'faxserversettings',
                resourceId: this.subscriberContext.id,
                resourceObjectId: this.faxServerSettingsObjectId
            })
            showGlobalSuccessMessage(this.$t('Updated FaxServer settings successfully'))
        },
        async submitMailToFaxSettings (data) {
            await this.updateMailToFaxSettings(data)
            await this.loadDataContext({
                resource: 'mailtofaxsettings',
                resourceId: this.subscriberContext.id,
                resourceObjectId: this.mailToFaxSettingsObjectId
            })
            showGlobalSuccessMessage(this.$t('Updated MailToFax settings successfully'))
        },
        async reloadDataContext () {
            await Promise.all([
                this.loadDataContext({
                    resource: 'faxserversettings',
                    resourceId: this.subscriberContext.id,
                    resourceObjectId: this.faxServerSettingsObjectId
                }),
                this.loadDataContext({
                    resource: 'mailtofaxsettings',
                    resourceId: this.subscriberContext.id,
                    resourceObjectId: this.mailToFaxSettingsObjectId
                })
            ])
        },
        async submit () {
            if (this.hasFaxServerSettingsUnsavedData) {
                this.$refs.faxServerSettingsForm.submit()
            }
            if (this.hasMailToFaxSettingsUnsavedData) {
                this.$refs.mailToFaxSettingsForm.submit()
            }
        },
        async reset () {
            this.$refs.faxServerSettingsForm.reset()
            this.$refs.mailToFaxSettingsForm.reset()
        }
    }
}
</script>
