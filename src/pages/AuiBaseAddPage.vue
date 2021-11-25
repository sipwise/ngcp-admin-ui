<template>
    <aui-base-page
        class="aui-base-add-page"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot
            :initial-form-data="initialFormData"
        />
    </aui-base-page>
</template>

<script>
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiBaseAddPage',
    components: {
        AuiBasePage
    },
    computed: {
        initialFormData () {
            return this.$store.state.creationSession[this.$route.path + '_formData']
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-add-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
