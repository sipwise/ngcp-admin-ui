<template>
    <aui-popup-menu-item
        v-bind="$attrs"
    />
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiListActionMenuItem',
    components: { AuiPopupMenuItem }
}
</script>
