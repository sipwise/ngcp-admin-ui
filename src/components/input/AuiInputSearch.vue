<template>
    <q-input
        :value="$attrs.value"
        clearable
        debounce="300"
        :label="$t('Search')"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:prepend
        >
            <q-icon
                name="search"
            />
        </template>
    </q-input>
</template>

<script>
export default {
    name: 'AuiInputSearch'
}
</script>
