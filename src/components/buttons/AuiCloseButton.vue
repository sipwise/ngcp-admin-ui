<template>
    <q-btn
        icon="clear"
        color="primary"
        size="sm"
        :label="$t('Close')"
        unelevated
        outline
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiCloseButton'
}
</script>
