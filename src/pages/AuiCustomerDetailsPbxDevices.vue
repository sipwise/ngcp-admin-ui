<template>
    <div>
        <div
            v-if="!$wait.is(downloadWaitIdentifier) && customerContext && !customerContextHasSubscribers"
            class="proxy-warning q-pa-xs text-left q-pb-lg"
        >
            <q-icon
                name="warning"
                size="xs"
                color="warning"
            />
            {{ $t('At least a subscriber has to be created before adding devices.') }}
        </div>
        <aui-details-page-proxy
            v-else
            :proxy-page-title="false"
        />
    </div>
</template>

<script>
import AuiDetailsPageProxy from 'src/pages/AuiDetailsPageProxy.vue'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import customerSubscriberContextMixin from 'src/mixins/data-context-pages/customer-details-subscriber'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiCustomerDetailsPbxDevices',
    components: { AuiDetailsPageProxy },
    mixins: [
        customerContextMixin,
        customerSubscriberContextMixin
    ],
    computed: {
        downloadWaitIdentifier () {
            return WAIT_PAGE
        }
    },
    async mounted () {
        await this.fetchCustomerContextSubscribers()
    }
}
</script>
