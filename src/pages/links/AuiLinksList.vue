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
                    name: 'NGCP release calendar',
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
        if (this.platformInfo?.type === 'sppro') {
            this.linkList.push({
                name: 'SLA and Emergency contacts',
                url: 'https://www.sipwise.com'
            })
        }
    }
}
</script>
