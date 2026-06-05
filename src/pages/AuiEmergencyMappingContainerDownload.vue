<template>
    <aui-base-add-page>
        <template
            #default="{ loading }"
        >
            <portal
                to="page-toolbar-left"
            >
                <q-btn
                    class="q-mr-xs"
                    icon="fas fa-download"
                    color="accent"
                    size="sm"
                    :label="$t('Download')"
                    :disable="loading || $waitPage($wait) || hasInvalidData"
                    unelevated
                    @click="download"
                />
                <aui-close-button
                    :disable="loading || $waitPage($wait)"
                    @click="$auiGoToPrevForm()"
                />
            </portal>
            <aui-base-form
                layout="5"
            >
                <template
                    #col-1
                >
                    <aui-base-form-field
                        v-if="requiresResellerSelection"
                    >
                        <aui-select-reseller
                            v-model="formData.reseller_id"
                            dense
                            class="aui-required"
                            :hide-bottom-space="true"
                            :disable="loading || $waitPage($wait)"
                            :error="resellerIdHasError"
                            :error-message="$t('Input is required')"
                            @blur="resellerIdTouched = true"
                        />
                    </aui-base-form-field>
                </template>
            </aui-base-form>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'

export default {
    name: 'AuiEmergencyMappingContainerDownload',
    components: {
        AuiBaseAddPage,
        AuiBaseForm,
        AuiBaseFormField,
        AuiCloseButton,
        AuiSelectReseller
    },
    data () {
        return {
            formData: {
                reseller_id: null
            },
            resellerIdTouched: false
        }
    },
    computed: {
        requiresResellerSelection () {
            return this.$aclCan('read', 'entity.resellers')
        },
        initialFormData () {
            return this.$store.state.creationSession.currentFormData
        },
        resellerId () {
            if (this.requiresResellerSelection) {
                return this.formData.reseller_id
            }
            return null
        },
        resellerIdHasError () {
            return this.requiresResellerSelection && this.resellerIdTouched && !this.formData.reseller_id
        },
        hasInvalidData () {
            return this.requiresResellerSelection && !this.resellerId
        }
    },
    watch: {
        initialFormData: {
            handler (initialFormData) {
                this.formData.reseller_id = initialFormData?.reseller_id || null
            },
            immediate: true
        }
    },
    methods: {
        ...mapWaitingActions('emergencyMappings', {
            downloadCsv: WAIT_PAGE
        }),
        async download () {
            this.resellerIdTouched = true
            const payload = {}
            if (this.requiresResellerSelection) {
                payload.reseller_id = this.resellerId
            }
            await this.downloadCsv(payload)
        }
    }
}
</script>
