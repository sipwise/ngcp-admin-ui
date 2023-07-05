<template>
    <q-toolbar
        class="bg-secondary q-pl-lg"
    >
        <a
            :href="url"
            style="text-decoration: none; color: black; font-weight: 300; display: inline-flex;"
        >
            <q-icon
                :class="icon" 
                style="font-size: 20px;"
            /> 
            {{ title }}
        </a>
        <q-space />
        <aui-more-menu>
            <aui-popup-menu-item
                :label="(fullscreen)? $t('Exit Fullscreen'):$t('Fullscreen')"
                :icon="(fullscreen)? 'fullscreen_exit':'fullscreen'"
                @click="toggleFullscreenEvent"
            />
            <aui-popup-menu-item
                icon="refresh"
                :label="$t('Refresh')"
                @click="refreshEvent"
            />
        </aui-more-menu>
    </q-toolbar>
</template>
<script>
import AuiMoreMenu from 'components/AuiMoreMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'AuiMenuStatistics',
    components: {
        AuiMoreMenu,
        AuiPopupMenuItem
    },
    props: {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: undefined
        },
        icon: {
            type: String,
            default: undefined
        }
    },
    computed: {
        ...mapState('layout', [
            'fullscreen'
        ])
    },
    methods: {
        ...mapMutations('layout', [
            'toggleFullscreen'
        ]),
        toggleFullscreenEvent () {
            this.toggleFullscreen()
            if (this.fullscreen) {
                this.$emit('fullscreen')
            } else {
                this.$emit('fullscreen-exit')
            }
        },
        refreshEvent () {
            this.$emit('refresh-iframe')
        }
    }
}
</script>
