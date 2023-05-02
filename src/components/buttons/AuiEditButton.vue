<template>
    <q-btn
        icon="edit"
        color="primary"
        size="sm"
        :label="$t('Edit')"
        unelevated
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiEditButton'
}
</script>
