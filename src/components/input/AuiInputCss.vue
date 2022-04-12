<template>
    <q-input
        input-style="height: 300px"
        :value="$attrs.value"
        type="textarea"
        outlined
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>
