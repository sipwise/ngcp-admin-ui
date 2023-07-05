<template>
    <div>
        <aui-menu-statistics 
            :title="$t('Kamailio Statistics')"
            :url="$t('#/kam-statistics')"
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
    name: 'AuiKamailioMemory',
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
                    label: 'Kamailio Memory sp1', 
                    srcs: [
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=5',
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=11',
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=7'
                    ] 
                },
                { 
                    label: 'Kamailio Memory sp2', 
                    srcs: [
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=9',
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=12',
                        '/grafana/d-solo/kam-statistics/kamailio-statistics??orgId=1&refresh=1m&panelId=10'
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
