<template>
    <div
        class="aui-base-sub-context"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AuiBaseSubContext'
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-sub-context
    padding: $aui-page-padding
</style>
