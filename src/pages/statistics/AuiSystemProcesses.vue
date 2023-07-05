<template>
    <div>
        <aui-menu-statistics 
            :title="$t('System Processes')"
            :url="$t('#/system-processes')"
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
    name: 'AuiSystemProcesses',
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
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=1',
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=2',
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=3',
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=4',
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=5',
                        '/grafana/d-solo/system-processes/system-processes?orgId=1&refresh=1m&panelId=6'
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
