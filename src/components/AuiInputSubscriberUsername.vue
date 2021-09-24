<template>
    <q-input
        :value="value"
        autocomplete="username"
        clearable
        v-bind="$attrs"
        v-on="$listeners"
        @input="$emit('input', $event)"
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
    name: 'AuiInputWebUsername',
    props: {
        value: {
            type: String,
            default: ''
        },
        tooltip: {
            type: String,
            default: null
        }
    }
}
</script>
