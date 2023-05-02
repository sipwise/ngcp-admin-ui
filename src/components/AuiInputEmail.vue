<template>
    <q-input
        :model-value="value"
        dense
        type="email"
        v-bind="$attrs"
        clearable
        @update:model-value="$emit('input', $event)"
    >
        <template
            v-if="showIcon"
            #prepend
        >
            <q-icon
                name="email"
            />
        </template>
        <q-tooltip>
            {{ tooltip }}
        </q-tooltip>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputEmail',
    props: {
        value: {
            type: String,
            default: ''
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: String,
            default: ''
        }
    },
    emits: ['input']
}
</script>
