<template>
    <q-btn
        icon="save"
        color="primary"
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
