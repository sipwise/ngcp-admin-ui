<template>
    <div class="text-dark">
        <a
            v-for="(link, index) of linkList"
            :key="index"
            :href="`${link.url}`"
            target="blank"
        >
            <div class="text-h5 text-dark q-ma-xl">
                <i class="fas fa-external-link-alt" />
                <span class="q-ml-md">{{ link.name }}</span>
            </div>
        </a>
    </div>
</template>
<script>
import { mapState } from 'vuex'
const { createHash } = require('crypto')
export default {
    name: 'AuiLinksList',
    data () {
        return {
            linkList: [
                {
                    name: 'Sipwise Website',
                    url: 'http://www.sipwise.com'
                },
                {
                    name: 'NGCP Release Calendar',
                    url: 'https://www.sipwise.com/releases/'
                }
            ]
        }
    },
    computed: {
        ...mapState('user', [
            'platformInfo'
        ])
    },
    mounted () {
        const regex = /((mr\d+)\.(\d+))/
        let version = this.platformInfo?.ngcp_version
        const found = version.match(regex)
        if (found) {
            version = found[1]
        }
        const hashVersion = createHash('sha256').update(version).digest('hex')
        if (this.platformInfo?.type === 'sppro' || this.platformInfo?.type === 'carrier') {
            this.linkList.push({
                name: 'Sipwise Ticketing System',
                url: 'https://support.sipwise.com/'
            },
            {
                name: 'Sipwise Support Hotline Numbers',
                url: `https://www.sipwise.com/static/info/${hashVersion}.html`
            })
        } else {
            this.linkList.push({
                name: 'Sipwise Mailing List for CE users',
                url: 'https://lists.sipwise.com/mailman/listinfo/spce-user_lists.sipwise.com'
            })
        }
    }
}
</script>
