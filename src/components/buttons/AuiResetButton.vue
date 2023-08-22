<template>
    <q-btn
        icon="undo"
        color="primary"
        size="sm"
        :label="$t('Reset')"
        data-cy="aui-reset-button"
        unelevated
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiResetButton'
}
</script>
