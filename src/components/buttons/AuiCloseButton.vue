<template>
    <q-btn
        icon="clear"
        color="primary"
        size="sm"
        :label="$t('Close')"
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
