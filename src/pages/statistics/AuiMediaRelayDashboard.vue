<template>
    <div>
        <aui-menu-statistics 
            :title="$t('RTP Statistics')"
            :url="$t('#/rtp-statistics')"
            :icon="$t('fas fa-phone-alt q-breadcrumbs__el-icon--with-label')"
            @refresh-iframe="handleRefreshIframe"
        />
        <aui-menu-basic-tab 
            :iframes="iframes"
        />
    </div>
</template>

<script>
import AuiMenuStatistics from 'components/AuiMenuStatistics'
import AuiMenuBasicTab from 'components/AuiMenuBasicTab'
import { iframeReloadMixin } from 'src/mixins/iframes'
export default {
    name: 'AuiMediaRelayDashboard',
    components: {
        AuiMenuStatistics,
        AuiMenuBasicTab
    },
    mixins: [iframeReloadMixin], 
    data () {
        return {
            iframes: [
                
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=2' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=4' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=10' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=6' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=8' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=12' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=14' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=16' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=15' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=18' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=19' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=20' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=21' },
                { src: '/grafana/d-solo/rtp-statistics/media-relay-statistics?orgId=1&refresh=1m&panelId=22' }
            ]
        }
    },
    methods: {
        handleRefreshIframe () {
            this.reloadIframes()
        }
    }
}
</script>
