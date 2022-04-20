<template>
    <q-item-label
        header
        class="text-uppercase"
    >
        <q-icon
            v-if="icon"
            :name="icon"
            size="sm"
            class="q-mr-sm"
        />
        {{ headline }}
    </q-item-label>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: null
        },
        headline: {
            type: String,
            required: true
        }
    }
}
</script>
