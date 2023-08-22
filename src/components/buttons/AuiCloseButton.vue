<template>
    <q-btn
        icon="clear"
        color="primary"
        size="sm"
        :label="$t('Close')"
        data-cy="aui-close-button"
        unelevated
        outline
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiCloseButton'
}
</script>
