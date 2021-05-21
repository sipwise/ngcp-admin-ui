<template>
    <aui-base-page
        class="aui-base-add-page"
        v-bind="$attrs"
        v-on="$listeners"
        @refresh="refresh"
    >
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-xl"
                :disable="$attrs.loading || $waitPage()"
                @click="submit"
            />
            <aui-close-button
                class="q-mr-sm"
                :disable="$attrs.loading || $waitPage()"
                @click="$router.back()"
            />
        </portal>
        <slot />
    </aui-base-page>
</template>

<script>
import AuiBasePage from 'pages/AuiBasePage'
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
export default {
    name: 'AuiBaseAddPage',
    components: {
        AuiCloseButton,
        AuiSaveButton,
        AuiBasePage
    },
    methods: {
        getForm () {
            if (this.$slots.default && this.$slots.default[0]) {
                const firstComponent = this.$slots.default[0].componentInstance
                if (firstComponent.$el && firstComponent.$el.tagName.toLowerCase() === 'form') {
                    return firstComponent
                }
            }
            return null
        },
        submit () {
            const form = this.getForm()
            if (form && form.submit) {
                form.submit()
            }
        },
        refresh () {
            const form = this.getForm()
            if (form && form.reset) {
                form.reset()
            }
        },
        goBack () {
            this.$router.back()
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-add-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
