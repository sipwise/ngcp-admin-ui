<template>
    <aui-base-page
        class="aui-base-add-page"
        v-bind="$attrs"
    >
        <slot
            :initial-form-data="initialFormData"
            :loading="$waitPage($wait)"
        />
    </aui-base-page>
</template>

<script>
import AuiBasePage from 'pages/AuiBasePage'
import creationSession from 'src/mixins/creation-session'
export default {
    name: 'AuiBaseAddPage',
    components: {
        AuiBasePage
    },
    mixins: [creationSession]
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-add-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
