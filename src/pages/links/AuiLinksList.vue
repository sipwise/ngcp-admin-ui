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
        ]),
        isPro () {
            return ['sppro'].includes(this.platformInfo?.type)
        }
    },
    mounted () {
        if (this.platformInfo?.type === 'sppro' || this.platformInfo?.type === 'carrier') {
            this.linkList.push({
                name: 'Sipwise Ticketing System',
                url: 'https://support.sipwise.com/'
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
