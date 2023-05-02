<template>
    <aui-base-sub-context>
        <template
            #default="{ initialFormData }"
        >
            <aui-subscriber-new-registered-device
                v-if="subscriberContext"
                :initial-form-data="initialFormData"
                :loading="$waitPage($wait)"
                :subscriber-id="subscriberId"
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
            </aui-subscriber-new-registered-device>
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiSubscriberNewRegisteredDevice from 'components/edit-forms/AuiSubscriberNewRegisteredDevice'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberRegisteredDevicesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiSubscriberNewRegisteredDevice
    },
    mixins: [
        subscriberContextMixin
    ],
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        subscriberId () {
            return this.subscriberContext?.id
        },
        expires () {
            return this.subscriberContext?.createdTimestamp
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            createRegisteredDevice: WAIT_PAGE
        }),
        async create (data) {
            data.subscriber_id = this.subscriberId
            data.expires = '2099-01-01 00:00:00' // Hardcoded future date
            data.nat = true
            await this.createRegisteredDevice(data)
            showGlobalSuccessMessage(this.$t('Registered Device created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
