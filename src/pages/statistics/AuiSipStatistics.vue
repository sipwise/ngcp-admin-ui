<template>
    <div>
        <aui-menu-statistics 
            :title="$t('SIP Statistics')"
            :url="$t('#/sip-statistics')"
            :icon="$t('fas fa-chart-bar q-breadcrumbs__el-icon--with-label')"
            @refresh-iframe="handleRefreshIframe"
        />
        <aui-menu-tab 
            :selected-tab="selectedTab" 
            :iframes="iframes"
        />
    </div>
</template>
<script>
import AuiMenuStatistics from 'components/AuiMenuStatistics'
import AuiMenuTab from 'components/AuiMenuTab'
import { iframeReloadMixin } from 'src/mixins/iframes'
export default {
    name: 'AuiSipStatistics',
    components: {
        AuiMenuStatistics,
        AuiMenuTab
    },
    mixins: [iframeReloadMixin], 
    data () {
        return {
            selectedTab: 0,
            iframes: [
                { 
                    label: 'Statistics', 
                    srcs: [
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=4',
                            width: 480,
                            height: 150
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=5',
                            width: 480,
                            height: 150
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=3',
                            width: 480,
                            height: 150
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=6',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=8',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=1',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=2',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=9',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=11',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=12',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=13',
                            width: 725
                        }

                    ] 
                },
                { 
                    label: 'Peering Server All', 
                    srcs: [
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=14',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/sip-statistics/sip-statistics?orgId=1&panelId=15',
                            width: 725
                        }
                    ]  
                }
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
