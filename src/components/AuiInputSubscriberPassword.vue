<template>
    <q-input
        :value="value"
        :type="(passwordVisible)? 'text' : 'password'"
        :label="label"
        clearable
        autocomplete="current-password"
        v-bind="$attrs"
        v-on="$listeners"
        @input="$emit('input', $event)"
    >
        <template
            v-slot:append
        >
            <q-btn
                v-if="value !== ''"
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
                flat
                dense
                @click.stop="generatePassword"
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
import PasswordGenerator from 'generate-password'
export default {
    name: 'AuiWebInputPassword',
    props: {
        value: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        generate: {
            type: Boolean,
            default: false
        },
        generateLength: {
            type: Number,
            default: 10
        },
        generateNumbers: {
            type: Boolean,
            default: true
        },
        generateLowercase: {
            type: Boolean,
            default: true
        },
        generateUppercase: {
            type: Boolean,
            default: true
        },
        generateSymbols: {
            type: Boolean,
            default: false
        },
        generateExcludeSimilarCharacters: {
            type: Boolean,
            default: false
        },
        generateExclude: {
            type: String,
            default: ''
        },
        generateStrict: {
            type: Boolean,
            default: true
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
    data () {
        return {
            passwordVisible: this.showPassword
        }
    },
    methods: {
        toggleVisibility () {
            this.passwordVisible = !this.passwordVisible
            this.$emit('password-visible', this.passwordVisible)
        },
        generatePassword () {
            const pass = PasswordGenerator.generate({
                length: this.generateLength,
                numbers: this.generateNumbers,
                lowercase: this.generateLowercase,
                uppercase: this.generateUppercase,
                symbols: this.generateSymbols,
                excludeSimilarCharacters: this.generateExcludeSimilarCharacters,
                exclude: this.generateExclude,
                strict: this.generateStrict
            })
            this.$emit('input', pass)
            this.$emit('generated', pass)
        }
    }
}
</script>
