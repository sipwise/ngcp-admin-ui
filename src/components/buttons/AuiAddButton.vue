<template>
    <q-btn
        icon="add"
        color="primary"
        size="sm"
        :label="(showLabel) ? ($attrs.label || $t('Add')) : null"
        data-cy="aui-add-button"
        unelevated
        v-bind="$attrs"
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
