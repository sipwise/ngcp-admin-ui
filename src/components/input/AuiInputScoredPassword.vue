<template>
    <div>
        <q-input
            :model-value="$attrs.value"
            type="password"
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
    emits: ['score'],
    data () {
        return {
            password: ''
        }
    },
    mounted () {
        this.password = this.$attrs.value
    },
    methods: {
        emitInput (value) {
            this.password = value
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
