<template>
    <q-btn
        icon="edit"
        color="primary"
        size="sm"
        :label="$t('Edit')"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiEditButton'
}
</script>
