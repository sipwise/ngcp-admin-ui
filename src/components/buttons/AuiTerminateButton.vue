<template>
    <q-btn
        icon="delete"
        color="negative"
        size="sm"
        :label="$t('Terminate')"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiTerminateButton'
}
</script>
