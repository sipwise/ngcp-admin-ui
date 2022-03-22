<template>
    <aui-base-edit-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-upn-rewrite
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
            </aui-new-subscriber-upn-rewrite>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriberUpnRewrite from 'components/edit-forms/AuiNewSubscriberUpnRewrite'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsUpnRewriteCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewSubscriberUpnRewrite
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            createSubscriberUpnRewrite: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberUpnRewrite(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created UPN rewrite set'))
        }
    }
}
</script>
