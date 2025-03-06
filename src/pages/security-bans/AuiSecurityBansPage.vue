<template>
    <aui-base-page
        class="row no-wrap"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <q-list
            class="q-pl-md q-pt-md"
            :width="280"
        >
            <aui-main-menu-item
                v-for="(item, index) in menuItems"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
        <aui-security-bans-sip-ips-list
            v-if="showBannedSipIps"
            class="col aui-securityBans-list"
        />
        <aui-security-bans-sip-users-list
            v-if="showBannedSipUsers"
            class="col aui-securityBans-list"
        />
        <aui-security-bans-web-admins-list
            v-if="showBannedWebAdmins"
            class="col aui-securityBans-list"
        />
        <aui-security-bans-web-subs-list
            v-if="showBannedWebSubs"
            class="col aui-securityBans-list"
        />
    </aui-base-page>
</template>

<script>
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
import AuiSecurityBansSipIpsList from 'pages/security-bans/AuiSecurityBansSipIpsList'
import AuiSecurityBansSipUsersList from 'pages/security-bans/AuiSecurityBansSipUsersList'
import AuiSecurityBansWebAdminsList from 'pages/security-bans/AuiSecurityBansWebAdminsList'
import AuiSecurityBansWebSubsList from 'pages/security-bans/AuiSecurityBansWebSubsList'
export default {
    name: 'AuiSecurityBansPage',
    components: {
        AuiMainMenuItem,
        AuiBasePage,
        AuiSecurityBansSipUsersList,
        AuiSecurityBansSipIpsList,
        AuiSecurityBansWebAdminsList,
        AuiSecurityBansWebSubsList
    },
    props: {
        showBannedSipIps: {
            type: Boolean,
            default: false
        },
        showBannedSipUsers: {
            type: Boolean,
            default: false
        },
        showBannedWebAdmins: {
            type: Boolean,
            default: false
        },
        showBannedWebSubs: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        menuItems () {
            return [
                {
                    label: this.$t('Banned SIP IPs'),
                    icon: 'fas fa-user-slash',
                    to: { name: 'securityBansSipIpsPage' }
                },
                {
                    label: this.$t('Banned SIP Users'),
                    icon: 'fas fa-user-slash',
                    to: { name: 'securityBansSipUsersPage' }
                },
                {
                    label: this.$t('Banned Web Admins'),
                    icon: 'fas fa-user-slash',
                    to: { name: 'securityBansWebAdminsPage' }
                },
                {
                    label: this.$t('Banned Web Subs'),
                    icon: 'fas fa-user-slash',
                    to: { name: 'securityBansWebSubsPage' }
                }
            ]
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-securityBans-list
    padding: $aui-page-padding
</style>
