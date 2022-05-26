<template>
    <div>
        <q-input
            :value="$attrs.value"
            type="password"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <slot
                v-for="(_, name) in $slots"
                :slot="name"
                :name="name"
            />
            <template
                v-for="(_, name) in $scopedSlots"
                :slot="name"
                slot-scope="slotData"
            >
                <slot
                    :name="name"
                    v-bind="slotData"
                />
            </template>
            <template
                v-slot:prepend
            >
                <q-icon
                    name="lock"
                />
            </template>
        </q-input>
        <password-strength-meter
            :value="($attrs.value)?$attrs.value:''"
            class="aui-psm"
            :strength-meter-only="true"
            @score="$emit('score', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'AuiInputScoredPassword',
    components: {
        PasswordStrengthMeter: () => import(
            /* webpackChunkName: "pwd-sm-libs" */
            'vue-password-strength-meter'
        )
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.aui-psm
    max-width: none !important
    padding-top: 8px
    padding-bottom: 20px
    .Password__strength-meter
        margin: 0
</style>
