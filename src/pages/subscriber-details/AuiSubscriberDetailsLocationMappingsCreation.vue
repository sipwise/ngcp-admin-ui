<template>
    <aui-base-edit-context>
        <template
            #default="props"
        >
            <aui-new-subscriber-location-mapping
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
            </aui-new-subscriber-location-mapping>
        </template>
    </aui-base-edit-context>
</template>

<script>
import AuiNewSubscriberLocationMapping from 'components/edit-forms/AuiNewSubscriberLocationMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsCreation',
    components: {
        AuiFormActionsCreation,
        AuiBaseEditContext,
        AuiNewSubscriberLocationMapping
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            createSubscriberLocationMapping: WAIT_PAGE
        }),
        async create (data) {
            await this.createSubscriberLocationMapping(data)
            await this.$auiGoToPrevForm()
            showGlobalSuccessMessage(this.$t('Successfully created location mapping'))
        }
    }
}
</script>
