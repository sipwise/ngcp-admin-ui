<template>
    <q-input
        :model-value="value"
        :type="(passwordVisible)? 'text' : 'password'"
        color="primary"
        label-color="primary"
        autocomplete="current-password"
        v-bind="$attrs"
        @update:model-value="$emit('input', $event)"
    >
        <template
            #prepend
        >
            <q-icon
                color="primary"
                name="lock"
            />
        </template>
        <template
            #append
        >
            <q-btn
                color="primary"
                :icon="(passwordVisible)? 'visibility' : 'visibility_off'"
                flat
                round
                size="sm"
                tabindex="-1"
                @click="toggleVisibility"
            />
        </template>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputPassword',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['input', 'input-clear', 'password-visible'],
    data () {
        return {
            passwordVisible: false
        }
    },
    methods: {
        toggleVisibility () {
            this.passwordVisible = !this.passwordVisible
            this.$emit('password-visible', this.passwordVisible)
        }
    }
}
</script>
