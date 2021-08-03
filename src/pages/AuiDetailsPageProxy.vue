<template>
    <proxy
        :proxy-page-title="false"
        @loaded="pageLoaded"
    />
</template>

<script>
import Proxy from 'pages/Proxy'
export default {
    name: 'AuiDetailsPageProxy',
    components: { Proxy },
    methods: {
        pageLoaded ({ iframeWindow, route, url }) {
            const navigationInsideIFrame = route.path.indexOf(url) === -1
            // skip manipulation with DetailsPage section if there was navigation inside IFrame and we are on another page
            if (!navigationInsideIFrame) {
                const accordionSectionId = route?.meta?.proxyDetailsSectionId
                const $ = iframeWindow?.$
                if (typeof $ === 'function') {
                    // hide (remove) "expand groups" button
                    $('#toggle-accordions').remove()

                    $('#content .ngcp-separator:first').remove()

                    // hide (remove) all sections except required one
                    $('.accordion-group').filter(function () {
                        return $(`.accordion-body[id="${accordionSectionId}"]`, this).length !== 1
                    }).remove()

                    // auto-expand accordion section
                    iframeWindow.localStorage.setItem('lastTab', accordionSectionId)
                    $(`#${accordionSectionId}`).addClass('in')
                        .parent().addClass('open')
                        .find('.accordion-heading').remove().end()
                        .find('.accordion-toggle').removeClass('collapsed').end()
                        .find('.accordion-inner').css('border', 'none')
                }
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.proxy-iframe-wrapper::v-deep
    height: calc(100vh - 150px)
    .proxy-iframe
        height: calc(100vh - 150px)
</style>
