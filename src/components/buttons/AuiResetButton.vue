<template>
    <q-btn
        icon="undo"
        color="primary"
        size="sm"
        :label="$t('Reset')"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiResetButton'
}
</script>
