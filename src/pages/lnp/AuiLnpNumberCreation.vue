<template>
    <div>
        <aui-base-sub-context v-if="lnpCarrierContext">
            <template
                #default="props"
            >
                <aui-new-lnp-numbers
                    :carrier-from-context="lnpCarrierContext.id || null"
                    :initial-form-data="props.initialFormData"
                    :loading="$waitPage($wait)"
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
                </aui-new-lnp-numbers>
            </template>
        </aui-base-sub-context>

        <aui-base-add-page v-else>
            <template
                #default="props"
            >
                <aui-new-lnp-numbers
                    :initial-form-data="props.initialFormData"
                    :loading="$waitPage($wait)"
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
                </aui-new-lnp-numbers>
            </template>
        </aui-base-add-page>
    </div>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewLnpNumbers from 'components/edit-forms/AuiNewLnpNumbers'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import lnpCarrierContextMixin from 'src/mixins/data-context-pages/lnp-carrier'
import AuiBaseAddPage from 'src/pages/AuiBaseAddPage'
import AuiBaseSubContext from 'src/pages/AuiBaseSubContext'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiLnpNumberCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewLnpNumbers,
        AuiBaseSubContext,
        AuiBaseAddPage
    },
    mixins: [
        lnpCarrierContextMixin
    ],
    methods: {
        ...mapWaitingActions('lnp', {
            createLnpNumber: WAIT_PAGE
        }),
        async create (data) {
            await this.createLnpNumber(data)
            showGlobalSuccessMessage(this.$t('Ported Numbers created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
