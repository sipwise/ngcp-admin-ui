<template>
    <q-icon
        flat
        dense
        rounded
        unelevated
        name="cancel"
        size="sm"
        v-bind="$attrs"
        class="cursor-pointer"
        :color="color"
        @mouseenter="hoverState = true"
        @mouseleave="hoverState = false"
    >
        <slot />
    </q-icon>
</template>

<script>
export default {
    name: 'AuiClearableButton',
    data () {
        return {
            hoverState: false
        }
    },
    computed: {
        color () {
            return this.hoverState ? 'grey-7' : 'grey-5'
        }
    }
}
</script>
