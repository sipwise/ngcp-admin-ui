<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-header-manipulations
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
            </aui-new-header-manipulations>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewHeaderManipulations from 'components/AuiNewHeaderManipulations'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiHeaderManipulationsCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewHeaderManipulations,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            createHeaderRuleSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createHeaderRuleSet(data)
            showGlobalSuccessMessage(this.$t('Header set created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
