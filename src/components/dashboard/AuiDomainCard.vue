<template>
    <aui-dashboard-card
        :title="$t('Domains')"
        :count="domainsCount"
        :count-title="$t('Domain | Domains', Number(domainsCount || 0))"
        :button-title="$t('Configure')"
        :button-route-to="{ name: 'domainList' }"
        :items-list="domainItems"
        :loading="$wait.is('loading-domainCardInfo')"
        :error="domainCardInfoHasError"
    />
</template>

<script>
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiDomainCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'domainCardInfo',
            'domainCardInfoHasError'
        ]),
        domainsCount () {
            return this.domainCardInfo?.domains
        },
        domainItems () {
            return [
                {
                    icon: { name: 'fas fa-file-alt', color: this.iconsDefaultColor },
                    title: this.$t('Rewrite Rule Set | Rewrite Rule Sets', Number(this.domainCardInfo?.rewriteRuleSets || 0)),
                    value: this.domainCardInfo?.rewriteRuleSets
                },
                {
                    icon: { name: 'fas fa-music', color: this.iconsDefaultColor },
                    title: this.$t('Sound Set | Sound Sets', Number(this.domainCardInfo?.soundSets || 0)),
                    value: this.domainCardInfo?.soundSets
                }
            ]
        }
    },
    async mounted () {
        await this.fetchDomainCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchDomainCardInfo: 'loading-domainCardInfo'
        })
    }
}
</script>
