<template>
    <q-btn
        icon="save"
        color="accent"
        size="sm"
        :label="$t('Save')"
        data-cy="aui-save-button"
        unelevated
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiSaveButton'
}
</script>
