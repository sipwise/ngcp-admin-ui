<template>
    <q-layout
        view="hHh LpR fFf"
        container
        class="aui-details-page-q-layout"
    >
        <slot
            name="menu"
        >
            <aui-detail-page-menu />
        </slot>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import AuiDetailPageMenu from 'components/AuiDetailPageMenu'
export default {
    name: 'AuiDetailsPage',
    components: { AuiDetailPageMenu },
    props: {
        detailsPageRouteName: {
            type: String,
            default: ''
        },
        redirectToSubpageRoute: {
            type: Object,
            default: null
        }
    },
    watch: {
        $route () {
            this.redirectToTheSubpage()
        }
    },
    mounted () {
        this.redirectToTheSubpage()
    },
    methods: {
        redirectToTheSubpage () {
            if (this.detailsPageRouteName && this.redirectToSubpageRoute) {
                // Automatically redirects to the first details sub page
                // Note: We cannot use "redirect" option in router config for automatic redirection because of current
                //       implementation "Vue.prototype.$routeMeta" helpers
                if (this.$route.name === this.detailsPageRouteName) {
                    this.$router.replace(this.redirectToSubpageRoute)
                }
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.aui-details-page-q-layout
    min-height: calc(100vh - 150px) // Note: 150px is a sum of header's and footer's panels height
</style>
