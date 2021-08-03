<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
import { APP_NAME } from 'src/constants'

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
