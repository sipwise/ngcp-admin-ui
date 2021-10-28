<template>
    <q-btn
        icon="save"
        color="accent"
        size="sm"
        :label="$t('Save')"
        unelevated
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    name: 'AuiSaveButton'
}
</script>
