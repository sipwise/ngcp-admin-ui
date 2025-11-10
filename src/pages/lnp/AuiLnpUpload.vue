<template>
    <aui-base-page>
        <template
            #default="{loading }"
        >
            <aui-upload-csv
                :loading="loading"
                :label="$t('Upload Lnp Numbers CSV')"
                @submit="create"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-upload-csv>
            <div class="q-mb-md q-pa-md">
                <div class="text-caption text-grey-7">
                    {{ $t('CSV Column Order') }}: carrier_name, carrier_prefix, number, routing_number, start, end, authoritative, skip_rewrite, type
                </div>
            </div>
        </template>
    </aui-base-page>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBasePage from 'src/pages/AuiBasePage'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBasePage
    },
    methods: {
        ...mapWaitingActions('lnp', {
            uploadLnpCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadLnpCsv(data)
            showGlobalSuccessMessage(this.$t('Number porting saved successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
