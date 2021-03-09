<template>
    <q-popup-proxy>
        <q-list
            class="bg-white"
        >
            <slot />
        </q-list>
    </q-popup-proxy>
</template>

<script>
export default {
    name: 'AuiPopupMenu'
}
</script>
