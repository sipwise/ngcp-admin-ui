<template>
    <aui-base-sub-context>
        <slot />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiBaseEditContext',
    components: {
        AuiBaseSubContext
    },
    props: {
        showCloseButton: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-edit-context
    padding: $aui-page-padding
</style>
