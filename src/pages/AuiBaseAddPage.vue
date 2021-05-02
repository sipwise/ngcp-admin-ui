<template>
    <aui-base-page
        class="aui-base-add-page"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-xl"
                :disable="$attrs.loading"
                @click="$emit('save')"
            />
            <aui-close-button
                class="q-mr-sm"
                :disable="$attrs.loading"
                :to="{ name: this.$route.meta.listRoute }"
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
    components: {
        AuiCloseButton,
        AuiSaveButton,
        AuiBasePage
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-add-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
