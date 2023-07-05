export const iframeReloadMixin = {
    methods: {
        reloadIframes () {
            const iframes = this.iframes || []
        
            iframes.forEach((iframeGroup) => {
                if (iframeGroup.srcs) {
                    iframeGroup.srcs.forEach((src) => {
                        const iframe = document.querySelector(`iframe[src="${src}"]`)
                        if (iframe) {
                            iframe.src = src
                        } else {
                            const iframe = document.querySelector(`iframe[src="${src.source}"]`)
                            iframe.src = src.source
                        }
                    })
                } else if (iframeGroup.src) {
                    const iframeElement = document.querySelector(`iframe[src="${iframeGroup.src}"]`)
                    if (iframeElement) {
                        iframeElement.src = iframeGroup.src
                    }
                }
            })
        }
    }
}
