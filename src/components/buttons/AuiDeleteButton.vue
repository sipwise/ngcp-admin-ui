<template>
    <q-btn
        icon="delete"
        color="negative"
        size="sm"
        unelevated
        :label="buttonLabel"
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'AuiDeleteButton',
    props: {
        showLabel: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        buttonLabel () {
            if (this.showLabel) {
                return this.$attrs.label || this.$t('Delete')
            } else {
                return undefined
            }
        }
    }
}
</script>
