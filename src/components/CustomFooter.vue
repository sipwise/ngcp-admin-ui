<template>
    <q-footer
        v-model="footerVisible"
        class="bg-white text-primary"
    >
        <q-toolbar>
            <div
                v-if="platformInfo?.type === 'spce'"
                class="custom-text"
            >
                <span class="material-icons">warning_amber</span>
                {{ "You are currently using the community edition version. " }}
                <a
                    href="https://www.sipwise.com/company/contact/"
                    target="_blank"
                    class="pro-link"
                >Buy the PRO version</a>
                {{ " to remove this banner and get plenty of other amazing features !" }}
                <i class="material-icons">auto_fix_high</i>
            </div>
            <q-toolbar-title />
            <aui-go-to-old-admin-panel />
        </q-toolbar>
        <q-bar
            v-if="eolStatus"
            dense
            class="eol-notice"
            :class="eolStatus.color === 'warning' ? 'bg-warning text-dark' : 'bg-negative text-white'"
            role="status"
            aria-live="polite"
        >
            <div class="full-width text-center text-caption">
                {{ eolMessage }}
            </div>
        </q-bar>
    </q-footer>
</template>

<script>
import AuiGoToOldAdminPanel from 'components/buttons/AuiGoToOldAdminPanel'
import { getEolStatus } from 'src/helpers/eol'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'CustomFooter',
    components: { AuiGoToOldAdminPanel },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('layout', [
            'footerVisible'
        ]),
        ...mapState('user', [
            'platformInfo'
        ]),
        ...mapGetters('user', [
            'internalRole'
        ]),
        eolStatus () {
            return getEolStatus(this.platformInfo, this.internalRole)
        },
        eolMessage () {
            if (!this.eolStatus) {
                return ''
            }
            const date = new Intl.DateTimeFormat(this.$i18n.locale, {
                day: 'numeric',
                month: 'short',
                timeZone: 'UTC',
                year: 'numeric'
            }).format(this.eolStatus.expiresAt)
            return this.$t(
                this.eolStatus.expired
                    ? 'NGCP {release} reached end of life on {date}.'
                    : 'NGCP {release} reaches end of life on {date}.',
                { date, release: this.eolStatus.release }
            )
        }
    }
}
</script>
<style>
.q-bar.eol-notice {
    height: auto;
    min-height: 24px;
    padding-bottom: env(safe-area-inset-bottom);
    overflow-wrap: anywhere;
}
.q-footer {
    background-color: #f8f9fa;
    color: #495057;
}
.border-top-class {
    border-top: 1px solid #dee2e6;
}
.custom-text {
    font-size: 17px;
    font-weight: 400;
    padding: 17px 34px;
    line-height: 1.5;
    text-align: center;
    color: #000000;
    font-family: Arial, Helvetica, sans-serif;
}
a {
    color: #225f299e;
    text-decoration: none;
}
.pro-link {
    color: #2aa12e;
    font-weight: bold;
    text-decoration: underline;
    font-family: Arial, Helvetica, sans-serif;
}
.material-icons {
    font-size: 23px;
    margin-left: 5px;
    vertical-align: middle;
}
</style>
