<template>
    <aui-base-page
        class="aui-base-list-page"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <slot />
    </aui-base-page>
</template>
<script>
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiBaseListPage',
    components: {
        AuiBasePage
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-base-list-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
