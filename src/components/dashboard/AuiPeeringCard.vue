<template>
    <aui-dashboard-card
        :title="$t('Peerings')"
        :count="peeringCount"
        :count-title="$tc('Peering Group | Peering Groups', Number(peeringCount || 0))"
        :button-title="$t('Configure')"
        :button-route-to="{ name: 'peeringGroupList' }"
        :items-list="peeringItems"
        :loading="$wait.is('loading-peeringCardInfo')"
        :error="peeringCardInfoHasError"
    />
</template>

<script>
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
export default {
    name: 'AuiPeeringCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'peeringCardInfo',
            'peeringCardInfoHasError'
        ]),
        peeringCount () {
            return this.peeringCardInfo?.groups
        },
        peeringItems () {
            return [
                {
                    icon: { name: 'fas fa-server', color: this.iconsDefaultColor },
                    title: this.$t('Peering Server | Peering Servers', Number(this.peeringCardInfo?.servers || 0)),
                    value: this.peeringCardInfo?.servers
                },
                {
                    icon: { name: 'fas fa-exchange-alt', color: this.iconsDefaultColor },
                    title: this.$t('Peering Rule | Peering Rules', Number(this.peeringCardInfo?.rules || 0)),
                    value: this.peeringCardInfo?.rules
                }
            ]
        }
    },
    async mounted () {
        await this.fetchPeeringCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchPeeringCardInfo: 'loading-peeringCardInfo'
        })
    }
}
</script>
