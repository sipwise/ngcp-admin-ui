<template>
    <router-view />
</template>

<script>
import { APP_NAME } from 'src/constants'

/**
 * Stop error resizeObserver
 * This code ensures that when a ResizeObserver is created,
 * the provided callback function is debounced with a 20ms delay.
 * This debouncing can help in handling and preventing excessive
 * calls to the callback, especially in scenarios where the
 * ResizeObserver can be triggered frequently.
 *
 * https://github.com/vuejs/vue-cli/issues/7431#issuecomment-1793385162
 */
const debounce = (callback, delay) => {
    let tid
    return function (args) {
        const ctx = self
        tid && clearTimeout(tid)
        tid = setTimeout(() => {
            callback.apply(ctx, args)
        }, delay)
    }
}

const _ = (window).ResizeObserver;
(window).ResizeObserver = class ResizeObserver extends _ {
    constructor (callback) {
        callback = debounce(callback, 20)
        super(callback)
    }
}

export default {
    name: 'App',
    meta () {
        return {
            title: this.pageTitle,
            titleTemplate: title => `${APP_NAME} - ${title}`
        }
    },
    data () {
        return {
            pageTitle: ''
        }
    },
    watch: {
        $route (value) {
            this.updateTitle(value)
        }
    },
    mounted () {
        this.$initWait()
        this.updateTitle(this.$route)
    },
    methods: {
        updateTitle: function (route) {
            if (route) {
                this.pageTitle = this.$routeMeta.$label(route) || route.name || ''
            } else {
                this.pageTitle = ''
            }
        }
    }
}
</script>
