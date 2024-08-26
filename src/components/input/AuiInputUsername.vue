<template>
    <q-input
        :model-value="value"
        autocomplete="username"
        color="primary"
        label-color="primary"
        v-bind="$attrs"
        @update:model-value="$emit('input', $event)"
    >
        <template
            #prepend
        >
            <q-icon
                color="primary"
                name="fas fa-user-cog"
            />
        </template>
        <template
            v-if="value !== ''"
            #append
        >
            <q-btn
                color="primary"
                icon="close"
                flat
                round
                size="sm"
                tabindex="-1"
                @click="$emit('input-clear')"
            />
        </template>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputUsername',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['input', 'input-clear']
}
</script>
