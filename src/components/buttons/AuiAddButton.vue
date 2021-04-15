<template>
    <q-btn
        icon="add"
        color="primary"
        size="sm"
        :label="$t('Add')"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot />
    </q-btn>
</template>

<script>
export default {
    name: 'AuiAddButton'
}
</script>
