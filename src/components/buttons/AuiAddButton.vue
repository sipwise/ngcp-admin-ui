<template>
    <q-btn
        icon="add"
        color="primary"
        size="sm"
        :label="(showLabel) ? ($attrs.label || $t('Add')) : null"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot />
    </q-btn>
</template>

<script>
export default {
    name: 'AuiAddButton',
    props: {
        showLabel: {
            type: Boolean,
            default: true
        }
    }
}
</script>
