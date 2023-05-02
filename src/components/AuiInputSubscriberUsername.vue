<template>
    <q-input
        :model-value="value"
        autocomplete="username"
        clearable
        v-bind="$attrs"
        @update:model-value="$emit('input', $event)"
    >
        <q-tooltip
            v-if="tooltip"
        >
            {{ tooltip }}
        </q-tooltip>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputSubscriberUsername',
    props: {
        value: {
            type: String,
            default: ''
        },
        tooltip: {
            type: String,
            default: null
        }
    },
    emits: ['input']
}
</script>
