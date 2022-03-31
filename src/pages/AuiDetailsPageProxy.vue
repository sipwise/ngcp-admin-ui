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
                    $(() => {
                        // hide (remove) "expand groups" button
                        $('#toggle-accordions').remove()

                        $('#content .ngcp-separator:first').remove()

                        // special fix to emulate that section was opened by mouse clicking.
                        // Note: it is required for some sections like "Customer Details \ Billing Profile Schedule"
                        $(`#${accordionSectionId}`).trigger('shown.bs.collapse')
                    })

                    // hide all sections except required one.
                    // Note: Unfortunately we cannot remove those sections because some pages have JS code in sections
                    //       which interfere with elements is another pages or adds extra behaviour
                    $('.accordion-group').filter(function () {
                        return $(`.accordion-body[id="${accordionSectionId}"]`, this).length !== 1
                    }).hide()

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
@import 'src/css/custom.variables.sass'

.proxy-iframe-wrapper::v-deep
    height: calc(100vh - 3 * #{$toolbar-min-height} - #{$aui-proxy-warning-pnl-height})
    .proxy-iframe
        height: calc(100vh - 3 * #{$toolbar-min-height} - #{$aui-proxy-warning-pnl-height})
</style>
