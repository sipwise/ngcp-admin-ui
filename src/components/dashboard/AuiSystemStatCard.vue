<template>
    <aui-dashboard-card
        :title="$t('System Status')"
        :button-title="$t('View Statistics')"
        :button-route-to="{ name: 'systemStatistics' }"
        :items-list="sysStatItems"
        :loading="$wait.is('loading-sysStatCardInfo')"
        :error="sysStatCardInfoHasError"
    >
        <template #counter>
            <q-icon
                name="fas fa-lightbulb"
                class="text-h2"
                :color="sysStatColor"
            />
        </template>
    </aui-dashboard-card>
</template>

<script>
import AuiDashboardCard from 'components/dashboard/AuiDashboardCard'
import AuiErrorsListDialog from 'components/dialog/AuiErrorsListDialog'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiSystemStatCard',
    components: { AuiDashboardCard },
    props: {
        iconsDefaultColor: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('dashboard', [
            'sysStatCardInfo',
            'sysStatCardInfoHasError'
        ]),
        sysStatColor () {
            const undefinedStateColor = this.iconsDefaultColor
            const apiToColorMap = {
                error: 'negative',
                warning: 'warning',
                ok: 'positive'
            }
            return apiToColorMap[this.sysStatCardInfo?.overallStatus?.status] || undefinedStateColor
        },
        sysStatBtnIcon () {
            const undefinedStateIcon = { name: 'fas fa-question', color: this.iconsDefaultColor }
            const apiToBtnIconMap = {
                error: { name: 'fas fa-exclamation-triangle', color: 'negative' },
                warning: { name: 'fas fa-exclamation-triangle', color: 'warning' },
                ok: { name: 'far fa-check-circle', color: this.iconsDefaultColor }
            }
            return apiToBtnIconMap[this.sysStatCardInfo?.overallStatus?.status] || undefinedStateIcon
        },
        sysStatText () {
            const apiSateToTextMap = {
                error: this.$t('Errors'),
                warning: this.$t('Warnings'),
                ok: this.$t('No issues')
            }
            return apiSateToTextMap[this.sysStatCardInfo?.overallStatus?.status] || null
        },
        sysStatItems () {
            const statusIcon = this.sysStatBtnIcon
            const getClassIfLongValue = (value, className = 'aui-status-long-value') => (String(value).length > 12) ? className : undefined
            const emergencyModeValue = (Number(this.sysStatCardInfo?.emergencyMode || 0) > 0) ? this.$t('Emergency Mode') : this.$t('Ok')
            const applicationsValue =
                (this.sysStatCardInfo?.emergencyMode === undefined || this.sysStatCardInfo?.emergencyMode === null)
                    ? this.sysStatCardInfo?.emergencyMode
                    : emergencyModeValue
            const showErrorsPopup = this.sysStatCardInfo?.overallStatus?.status !== 'ok'
            return [
                {
                    icon: statusIcon,
                    clickable: showErrorsPopup,
                    action: this.showErrors,
                    title: this.$t('Status'),
                    value: this.sysStatText
                },
                {
                    icon: { name: 'fas fa-cogs', color: this.iconsDefaultColor },
                    title: this.$t('Applications'),
                    valueClass: getClassIfLongValue(applicationsValue),
                    value: applicationsValue
                }
            ]
        }
    },
    watch: {
        async '$i18n.locale' () {
            // Note: SysStat has locale related response, so we need reload the data if we change locale
            await this.fetchSysStatCardInfo()
        }
    },
    async mounted () {
        await this.fetchSysStatCardInfo()
    },
    methods: {
        ...mapWaitingActions('dashboard', {
            fetchSysStatCardInfo: 'loading-sysStatCardInfo'
        }),
        showErrors () {
            this.$q.dialog({
                component: AuiErrorsListDialog,
                componentProps: {
                    title: this.$t('System errors'),
                    items: this.sysStatCardInfo?.overallStatus?.problems
                }
            })
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-dashboard-card
    :deep(.aui-status-long-value)
        padding-top: 35px
</style>
