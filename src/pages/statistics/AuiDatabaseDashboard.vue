<template>
    <div>
        <aui-menu-statistics 
            :title="$t('Database Statistics')"
            :url="$t('#/database-statistics')"
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
    name: 'AuiDatabaseDashboard',
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
                    label: 'Sp1', 
                    srcs: [
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=8',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=7',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=3',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=1',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=14'
                    ] 
                },
                { 
                    label: 'Sp2', 
                    srcs: [
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=17',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=18',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=19',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=20',
                        '/grafana/d-solo/database-statistics/database-statistics?orgId=1&refresh=1m&panelId=21'
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
