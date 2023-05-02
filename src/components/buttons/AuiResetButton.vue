<template>
    <q-btn
        icon="undo"
        color="primary"
        size="sm"
        :label="$t('Reset')"
        unelevated
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiResetButton'
}
</script>
