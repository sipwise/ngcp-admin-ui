<template>
    <q-layout view="hHh lpR fFf">
        <q-header
            class="bg-transparent"
        >
            <q-toolbar>
                <q-space />
                <aui-selection-language />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
        <custom-footer />
    </q-layout>
</template>

<script>
import CustomFooter from '../components/CustomFooter'
import AuiSelectionLanguage from '../components/AuiSelectionLanguage'
import { APP_NAME } from 'src/constants'
export default {
    name: 'Login',
    meta () {
        return {
            title: this.pageTitle,
            titleTemplate: title => `${APP_NAME} - ${title}`
        }
    },
    components: {
        CustomFooter,
        AuiSelectionLanguage
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
