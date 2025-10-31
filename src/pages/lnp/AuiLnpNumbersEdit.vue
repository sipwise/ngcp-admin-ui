<template>
    <aui-base-sub-context v-if="carrierObject">
        <aui-new-lnp-numbers
            v-if="numbersObject"
            :initial-form-data="numbersObject"
            :loading="$waitPage($wait)"
            :carrier-from-context="carrierId"
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
        </aui-new-lnp-numbers>
    </aui-base-sub-context>

    <aui-base-edit-context v-else>
        <aui-new-lnp-numbers
            v-if="numbersObject"
            :initial-form-data="numbersObject"
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
        </aui-new-lnp-numbers>
    </aui-base-edit-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewLnpNumbers from 'components/edit-forms/AuiNewLnpNumbers'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import dataContextPageMixin from 'src/mixins/data-context-page'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import lnpNumbersContextMixin from 'src/mixins/data-context-pages/lnp-numbers'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpNumbersEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewLnpNumbers,
        AuiBaseEditContext
    },
    mixins: [
        dataContextPageMixin,
        lnpCarrierContextMixin,
        lnpNumbersContextMixin
    ],
    computed: {
        carrierObject () {
            return this.getDataContextObject('lnpCarrierContext')
        },
        carrierId () {
            return this.carrierObject?.id || null
        },
        numbersObject () {
            return this.getDataContextObject('lnpNumbersContext')
        },
        numberId () {
            return this.carrierObject ? this.lnpCarrierNumbersContextId : this.lnpNumbersContextId
        }
    },
    methods: {
        ...mapWaitingActions('lnp', {
            updateLnpNumbers: WAIT_PAGE
        }),
        async update (data) {
            await this.updateLnpNumbers({
                id: this.numberId,
                payload: data
            })
            await this.reloadDataContext('lnpNumbersContext')
            showGlobalSuccessMessage(this.$t('Lnp Numbers saved successfully'))
        }
    }
}
</script>
