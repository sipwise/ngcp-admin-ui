<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-ncos-set
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
            </aui-new-ncos-set>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewNcosSet from 'components/edit-forms/AuiNewNCOSSet'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNCOSSetsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewNcosSet,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('ncosSets', {
            createNCOSSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createNCOSSet(data)
            showGlobalSuccessMessage(this.$t('NCOS Set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
