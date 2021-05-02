<template>
    <q-btn
        icon="delete"
        color="negative"
        size="sm"
        unelevated
        :label="$attrs.label || $t('Delete')"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiDeleteButton'
}
</script>
