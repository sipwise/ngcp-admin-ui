<template>
    <div>
        <aui-menu-statistics 
            :title="$t('VictoriaMetrics Statistics')"
            :url="$t('#/victoriametrics')"
            :icon="$t('fas fa-database q-breadcrumbs__el-icon--with-label')"
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
    name: 'AuiVictoriaMetrics',
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
                    label: 'Stats', 
                    srcs: [
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=85',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=26',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=107',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=108',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=77',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=87',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=38',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=81',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=82',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=78'
                    ],
                    width: 280,
                    height: 200 
                },
                { 
                    label: 'Overview', 
                    srcs: [
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=106',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=12',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=51',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=22',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=35',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=110'
                    ] 
                },
                { 
                    label: 'Resource usage', 
                    srcs: [
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=112',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=114',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=44',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=57',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=75',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=76',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=47',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=37',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=48',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=49'
                        
                    ] 
                },
                { 
                    label: 'Troubleshooting', 
                    srcs: [
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=66',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=68',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=116',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=60',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=90',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=118',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=120',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=74'
                        
                    ] 
                },
                { 
                    label: 'Storage', 
                    srcs: [
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=10',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=73',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=53',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=34',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=30',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=36',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=58',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=62',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=59',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=64',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=99',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=103',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=122',
                        '/grafana/d-solo/victoriametrics/victoriametrics?orgId=1&refresh=1m&panelId=105'
                        
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
