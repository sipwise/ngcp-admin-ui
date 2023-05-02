<template>
    <q-btn-dropdown
        icon="add"
        color="primary"
        size="sm"
        :label="$t('Add')"
        unelevated
        v-bind="$attrs"
    >
        <slot />
    </q-btn-dropdown>
</template>

<script>
export default {
    name: 'AuiAddDropdownButton'
}
</script>
