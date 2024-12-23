<template>
    <q-input
        :model-value="$attrs.value"
        :type="(passwordVisible)? 'text' : 'password'"
        :label="label"
        clearable
        autocomplete="current-password"
        v-bind="$attrs"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template
            #append
        >
            <q-btn
                :icon="(passwordVisible)? 'visibility' : 'visibility_off'"
                flat
                round
                size="sm"
                tabindex="-1"
                @click="toggleVisibility"
            />
            <q-btn
                v-if="generate"
                icon="casino"
                :disable="$attrs.disable || $attrs.loading"
                tabindex="-1"
                data-cy="subscriber-password-generate"
                flat
                dense
                @click.stop="generatePassword()"
            />
        </template>
        <q-tooltip
            v-if="tooltip"
        >
            {{ tooltip }}
        </q-tooltip>
    </q-input>
</template>

<script>
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiInputSubscriberPassword',
    props: {
        label: {
            type: String,
            default: ''
        },
        generate: {
            type: Boolean,
            default: false
        },
        tooltip: {
            type: String,
            default: null
        },
        showPassword: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'password-visible', 'generated'],
    data () {
        return {
            passwordVisible: this.showPassword
        }
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            generateGeneralPassword: WAIT_PAGE
        }),
        toggleVisibility () {
            this.passwordVisible = !this.passwordVisible
            this.$emit('password-visible', this.passwordVisible)
        },
        async generatePassword () {
            const password = await this.generateGeneralPassword()
            this.$emit('update:modelValue', password)
            this.$emit('generated', password)
        }
    }
}
</script>
