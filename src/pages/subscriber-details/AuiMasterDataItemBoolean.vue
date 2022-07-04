<template>
    <q-item>
        <q-item-section>
            <q-toggle
                :value="value"
                :label="label"
                disable
            />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>
