<template>
    <div
        class="aui-list-item-title"
    >
        <q-icon
            v-if="icon"
            :name="icon"
            :color="iconColor"
            size="24px"
        />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AuiListItemTitle',
    props: {
        icon: {
            type: String,
            default: ''
        },
        iconColor: {
            type: String,
            default: ''
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
</style>
