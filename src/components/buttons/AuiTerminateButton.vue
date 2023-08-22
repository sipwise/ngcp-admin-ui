<template>
    <q-btn
        icon="delete"
        color="negative"
        size="sm"
        :label="$t('Terminate')"
        data-cy="aui-terminate-button"
        unelevated
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiTerminateButton'
}
</script>
