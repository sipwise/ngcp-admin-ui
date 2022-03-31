<template>
    <aui-base-edit-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-trusted-sources
                :initial-form-data="props.initialFormData"
                :subscriber-id="resourceObject.id"
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
            </aui-new-subscriber-trusted-sources>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriberTrustedSources from 'components/edit-forms/AuiNewSubscriberTrustedSources'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsTrustedSourcesCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewSubscriberTrustedSources
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            createSubscriberTrustedSource: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberTrustedSource(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created trusted source'))
        }
    }
}
</script>
