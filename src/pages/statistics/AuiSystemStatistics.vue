<template>
    <div>
        <aui-menu-statistics 
            :title="$t('System Statistics')"
            :url="$t('#/system-statistics')"
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
    name: 'AuiSystemStatistics',
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
                    label: 'sp1', 
                    srcs: [
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=10',
                            width: 1000
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=18',
                            width: 220
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=20',
                            width: 220
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=39',
                            width: 500
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=37',
                            width: 500
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=6',
                            width: 430
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=16',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=9',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=11',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=13',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=12',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=14',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=15',
                            width: 725
                        }
                    ] 
                },
                { 
                    label: 'sp2', 
                    srcs: [
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=41',
                            width: 1000
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=42',
                            width: 220
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=43',
                            width: 220
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=44',
                            width: 500
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=45',
                            width: 500
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=46',
                            width: 430
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=47',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=48',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=49',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=50',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=51',
                            width: 480
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=52',
                            width: 725
                        },
                        {
                            source: '/grafana/d-solo/system-statistics/system-statistics?orgId=1&panelId=53',
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
