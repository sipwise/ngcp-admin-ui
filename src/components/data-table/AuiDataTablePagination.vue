<template>
    <div
        class="aui-data-table-pagination"
        data-cy="aui-data-table-pagination"
    >
        <q-pagination
            boundary-links
            direction-links
            boundary-numbers
            ellipses
            size="sm"
            flat
            :disable="loading"
            :max-pages="2"
            :max="pagesNumber"
            :model-value="value"
            @update:model-value="$emit('input', $event)"
        />
    </div>
</template>

<script>
export default {
    name: 'AuiDataTablePagination',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            required: true
        },
        pagesNumber: {
            type: Number,
            required: true
        }
    },
    emits: ['input']
}
</script>
