<template>
    <div>
        <q-input
            :model-value="$attrs.value"
            :type="(passwordVisible)? 'text' : 'password'"
            v-bind="$attrs"
            @update:model-value="emitInput"
        >
            <slot
                v-for="(_, name) in $slots"
                :name="name"
            />
            <template
                v-for="(_, name) in $slots"
            >
                <slot
                    :name="name"
                    v-bind="slotData"
                />
            </template>
            <template
                #prepend
            >
                <q-icon
                    name="lock"
                />
            </template>
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
            </template>
        </q-input>
        <password-meter
            data-cy="vue-password-strength-meter"
            :password="password"
            @score="$emit('score', $event.score)"
        />
    </div>
</template>

<script>
import PasswordMeter from 'vue-simple-password-meter'
export default {
    name: 'AuiInputScoredPassword',
    components: {
        PasswordMeter
    },
    props: {
        showPassword: {
            type: Boolean,
            default: false
        }
    },
    emits: ['score', 'password-visible'],
    data () {
        return {
            password: '',
            passwordVisible: this.showPassword
        }
    },
    mounted () {
        this.password = this.$attrs.value
    },
    methods: {
        emitInput (value) {
            this.password = value
        },
        toggleVisibility () {
            this.passwordVisible = !this.passwordVisible
            this.$emit('password-visible', this.passwordVisible)
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.po-password-strength-bar
    border-radius: 2px
    transition: all 0.2s linear
    height: 6px
    margin-bottom: 12px
    margin-top: 3px
    background-color: #ddd
</style>
