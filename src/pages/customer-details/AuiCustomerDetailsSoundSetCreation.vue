<template>
    <aui-base-add-context>
        <template
            #default="props"
        >
            <aui-new-sound-sets
                v-if="customerContext"
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :is-customer-details="true"
                :customer-id="customerContext.id"
                :reseller="customerContextReseller"
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
            </aui-new-sound-sets>
        </template>
    </aui-base-add-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewSoundSets from 'components/edit-forms/AuiNewSoundSets'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsSoundSetsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewSoundSets,
        AuiBaseAddContext
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('soundSets', {
            createSoundSets: WAIT_PAGE
        }),
        async create (data) {
            await this.createSoundSets(data)
            showGlobalSuccessMessage(this.$t('Sound Sets created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
