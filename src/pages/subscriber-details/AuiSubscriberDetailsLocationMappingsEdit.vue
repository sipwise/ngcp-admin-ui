<template>
    <aui-base-edit-context>
        <aui-new-subscriber-location-mapping
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :loading="dataContextLoading"
            :subscriber-id="dataContextRootObject.id"
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
        </aui-new-subscriber-location-mapping>
    </aui-base-edit-context>
</template>

<script>
import dataContext from 'src/mixins/data-context'
import AuiNewSubscriberLocationMapping from 'components/edit-forms/AuiNewSubscriberLocationMapping'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiSubscriberDetailsLocationMappingsEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewSubscriberLocationMapping
    },
    mixins: [
        dataContext
    ],
    computed: {
        dataContextResource () {
            return 'subscriberlocationmappings'
        },
        dataContextResourceId () {
            return this.$route.params.locationMappingId
        },
        dataContextFilters () {
            return {
                subscriber_id: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            updateSubscriberLocationMapping: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateSubscriberLocationMapping(data)
                showGlobalSuccessMessage(this.$t('Successfully updated location mapping'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
